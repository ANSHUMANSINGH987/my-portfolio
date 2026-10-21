import { createHash } from 'node:crypto';

interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redisPipeline = async (commands: unknown[][]): Promise<Array<{ result: unknown }>> => {
  if (!redisUrl || !redisToken) throw new Error('Upstash credentials are not configured');
  const response = await fetch(`${redisUrl}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!response.ok) throw new Error(`Upstash returned ${response.status}`);
  return response.json() as Promise<Array<{ result: unknown }>>;
};

const headerValue = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] || '' : value || '';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const dateKey = now.toISOString().slice(0, 10);
    const fingerprint = createHash('sha256')
      .update(`${headerValue(req.headers['x-forwarded-for'])}|${headerValue(req.headers['user-agent'])}`)
      .digest('hex');
    const monthlyKeys = Array.from({ length: 12 }, (_, index) => `analytics:views:month:${year}:${index}`);
    const yearlyKeys = [year - 2, year - 1, year].map((item) => `analytics:year:${item}`);

    const writes = await redisPipeline([
      ['INCR', 'analytics:views:total'],
      ['SET', `analytics:visitor:day:${dateKey}:${fingerprint}`, '1', 'NX', 'EX', '86400'],
      ['SET', `analytics:visitor:known:${fingerprint}`, '1', 'NX'],
      ['INCR', `analytics:views:day:${dateKey}`],
      ['INCR', `analytics:views:month:${year}:${month}`],
      ['INCR', `analytics:views:year:${year}`],
    ]);

    const increments: unknown[][] = [];
    if (writes[1]?.result === 'OK') increments.push(['INCR', `analytics:unique:day:${dateKey}`]);
    if (writes[2]?.result === 'OK') increments.push(['INCR', 'analytics:visitors:total']);
    if (increments.length > 0) await redisPipeline(increments);

    const reads = await redisPipeline([
      ['GET', 'analytics:visitors:total'],
      ['GET', `analytics:unique:day:${dateKey}`],
      ['GET', `analytics:views:month:${year}:${month}`],
      ['MGET', ...monthlyKeys],
      ['MGET', ...yearlyKeys],
    ]);
    const numberResult = (index: number) => Number(reads[index]?.result || 0);
    const arrayResult = (index: number) => (Array.isArray(reads[index]?.result) ? reads[index].result as Array<string | null> : []);
    const monthlyValues = arrayResult(3);
    const yearlyValues = arrayResult(4);
    const monthlyLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return res.status(200).json({
      totalVisitors: numberResult(0),
      uniqueToday: numberResult(1),
      currentMonthViews: numberResult(2),
      monthlyData: monthlyValues.map((value, index) => ({ date: monthlyLabels[index], views: Number(value || 0) })),
      yearlyData: yearlyValues.map((value, index) => ({ year: String(year - 2 + index), views: Number(value || 0) })),
    });
  } catch (error) {
    console.error('Visitor analytics tracking failed:', error);
    return res.status(503).json({ error: 'Analytics service unavailable' });
  }
}
