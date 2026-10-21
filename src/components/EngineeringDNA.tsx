import React, { useEffect, useMemo, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './EngineeringDNA.css';

type ChartMode = 'monthly' | 'yearly';

interface MonthlyPoint {
  date: string;
  views: number;
}

interface YearlyPoint {
  year: string;
  views: number;
}

interface AnalyticsPayload {
  totalVisitors: number;
  uniqueToday: number;
  currentMonthViews: number;
  monthlyData: MonthlyPoint[];
  yearlyData: YearlyPoint[];
}

const LiveChart: React.FC<{ mode: ChartMode; data: AnalyticsPayload }> = ({ mode, data }) => {
  const points = mode === 'monthly' ? data.monthlyData : data.yearlyData.map((point) => ({ date: point.year, views: point.views }));

  return (
    <div className="analytics-chart-wrap">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={points} margin={{ top: 12, right: 16, left: -20, bottom: 4 }}>
          <defs>
            <linearGradient id="visitor-area-gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} tick={{ fill: '#71717a', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#0c0d0e', border: '1px solid #3f3f46', borderRadius: 6, color: '#e4e4e7' }} labelStyle={{ color: '#38bdf8' }} />
          <Area type="monotone" dataKey="views" stroke="#38bdf8" strokeWidth={2} fill="url(#visitor-area-gradient)" />
        </AreaChart>
      </ResponsiveContainer>
      {points.length === 0 && <div className="analytics-empty-chart mono">NO TELEMETRY RECORDED YET</div>}
    </div>
  );
};

const GitHubContributions: React.FC = () => (
  <div className="github-contributions-card">
    <div className="github-contributions-header">
      <div>
        <span className="mono analytics-kicker">OPEN SOURCE ACTIVITY</span>
        <h3>Live GitHub contributions</h3>
      </div>
      <a href="https://github.com/ANSHUMANSINGH987" target="_blank" rel="noopener noreferrer" className="mono">View profile ↗</a>
    </div>
    <div className="github-calendar-wrap">
      <GitHubCalendar
        username="ANSHUMANSINGH987"
        colorScheme="dark"
        blockSize={12}
        blockMargin={4}
        fontSize={12}
        theme={{ dark: ['#18181b', '#164e63', '#0e7490', '#06b6d4', '#67e8f9'] }}
        errorMessage="GitHub contributions are temporarily unavailable."
      />
    </div>
  </div>
);

const VisitorAnalytics: React.FC = () => {
  const [mode, setMode] = useState<ChartMode>('monthly');
  const [data, setData] = useState<AnalyticsPayload | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/analytics/track', { method: 'POST', headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok) {
          const details = await response.text();
          throw new Error(`Analytics endpoint returned ${response.status}: ${details}`);
        }
        return response.json() as Promise<AnalyticsPayload>;
      })
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
          setStatus('ready');
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error('Live analytics unavailable:', error);
          setStatus('error');
        }
      });
    return () => { cancelled = true; };
  }, []);

  const activeData = useMemo(() => data || {
    totalVisitors: 0,
    uniqueToday: 0,
    currentMonthViews: 0,
    monthlyData: [],
    yearlyData: [],
  }, [data]);
  const displayMetric = (value: number) => status === 'loading' ? '...' : status === 'error' ? '—' : value.toLocaleString();

  return (
    <section className="container section visitor-analytics-section" id="visitor-analytics">
      <GitHubContributions />
      <div className="visitor-header">
        <div>
          <h2 className="section-title"><span>05 //</span> VISITOR ANALYTICS</h2>
          <h3 className="visitor-heading">Who&apos;s stopping by.</h3>
          <p className="visitor-subtitle">Real traffic telemetry from the people exploring this portfolio.</p>
        </div>
        <div className={`visitor-live-pill mono ${status === 'ready' ? 'is-live' : ''}`}>
          <span className="live-radar"><i></i><b></b></span>
          {status === 'ready' ? 'Live Telemetry // Edge Active' : status === 'loading' ? 'Connecting to telemetry...' : 'Telemetry offline'}
        </div>
      </div>

      <div className="visitor-panel">
        <div className="visitor-metrics">
          <div className="visitor-stat"><span className="mono">TOTAL VISITORS</span><strong>{displayMetric(activeData.totalVisitors)}</strong><small className="mono">unique lifetime sessions</small></div>
          <div className="visitor-stat"><span className="mono">UNIQUE TODAY</span><strong>{displayMetric(activeData.uniqueToday)}</strong><small className="mono">24h deduplicated</small></div>
          <div className="visitor-stat"><span className="mono">CURRENT MONTH</span><strong>{displayMetric(activeData.currentMonthViews)}</strong><small className="mono">page views</small></div>
          <div className="visitor-stat"><span className="mono">DATA SOURCE</span><strong className="visitor-stat-text">{status === 'error' ? 'Unavailable' : 'Upstash Redis'}</strong><small className="mono">serverless edge route</small></div>
        </div>

        <div className="analytics-chart-header">
          <div><span className="mono analytics-kicker">PAGE VIEWS / TRAFFIC HISTORY</span><h4>{mode === 'monthly' ? 'Monthly activity' : 'Yearly activity'}</h4></div>
          <div className="analytics-toggle mono" role="group" aria-label="Chart time range">
            <button type="button" className={mode === 'monthly' ? 'active' : ''} onClick={() => setMode('monthly')}>Monthly</button>
            <button type="button" className={mode === 'yearly' ? 'active' : ''} onClick={() => setMode('yearly')}>Yearly</button>
          </div>
        </div>
        {status === 'error' ? (
          <div className="analytics-error mono">LIVE ANALYTICS UNAVAILABLE<br /><span>Check the browser console and configure the serverless endpoint with Upstash credentials.</span></div>
        ) : (
          <LiveChart mode={mode} data={activeData} />
        )}
      </div>
    </section>
  );
};

export default VisitorAnalytics;
