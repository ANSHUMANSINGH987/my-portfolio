// Real visitor analytics tracking using Firebase Realtime Database
// Tracks unique visitors (via fingerprint), page views, and daily stats.

import { 
  ref, push, set, get, onValue, off
} from 'firebase/database';
import { database } from '../firebase';

export const isAnalyticsConfigured = database !== null;

// ── Types ──
export interface AnalyticsData {
  visitors: number;
  visitorChange: number;
  pageViews: number;
  pageViewChange: number;
  chartSeries: {
    visitors: number[];
    pageViews: number[];
    labels: string[];
  };
  topPages: { path: string; views: number }[];
}

export type TimeRange = '24H' | '7D' | '30D';

// ── Fingerprinting (lightweight, no external lib) ──
const generateFingerprint = (): string => {
  const nav = navigator;
  const screen = window.screen;
  const raw = [
    nav.userAgent,
    nav.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    nav.hardwareConcurrency || '',
    (nav as Navigator & { deviceMemory?: number }).deviceMemory || '',
  ].join('|');
  
  // Simple hash
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};

// ── Date helpers ──
const getDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

const getHourKey = (date: Date): string => {
  return `${getDateKey(date)}_${date.getHours().toString().padStart(2, '0')}`;
};

const subtractDays = (date: Date, days: number): Date => {
  const d = new Date(date);
  d.setDate(d.getDate() - days);
  return d;
};

// ── Check if this is a real visitor (not a bot, not localhost in prod) ──
const isRealVisitor = (): boolean => {
  // Allow tracking on localhost for development/testing
  // In production, bots are filtered by user agent
  const ua = navigator.userAgent.toLowerCase();
  const botPatterns = ['bot', 'crawler', 'spider', 'headless', 'lighthouse', 'pagespeed'];
  return !botPatterns.some(pattern => ua.includes(pattern));
};

// ── Record a visit ──
export const recordVisit = async (): Promise<void> => {
  if (!database || !isRealVisitor()) return;
  
  try {
    const now = new Date();
    const dateKey = getDateKey(now);
    const hourKey = getHourKey(now);
    const fingerprint = generateFingerprint();
    const page = window.location.pathname || '/';
    
    // Record page view (every visit)
    const pageViewRef = ref(database, `analytics/pageViews/${dateKey}`);
    const newPageView = push(pageViewRef);
    await set(newPageView, {
      timestamp: now.getTime(),
      page,
      hour: hourKey,
    });

    // Record unique visitor (check if fingerprint exists for today)
    const visitorRef = ref(database, `analytics/visitors/${dateKey}/${fingerprint}`);
    const visitorSnapshot = await get(visitorRef);
    
    if (!visitorSnapshot.exists()) {
      await set(visitorRef, {
        firstSeen: now.getTime(),
        page,
      });
    }

    // Record page-level stats
    const pageStatsRef = ref(database, `analytics/pageStats/${dateKey}/${encodeURIComponent(page)}`);
    const pageStatsSnapshot = await get(pageStatsRef);
    const currentCount = pageStatsSnapshot.exists() ? pageStatsSnapshot.val().views : 0;
    await set(pageStatsRef, { views: currentCount + 1 });
    
  } catch (error) {
    // Silently fail — analytics should never break the site
    console.warn('Analytics recording failed:', error);
  }
};

// ── Fetch analytics data for a time range ──
export const fetchAnalytics = async (timeRange: TimeRange): Promise<AnalyticsData> => {
  if (!database) {
    throw new Error('Firebase analytics is not configured');
  }

  const now = new Date();
  
  let daysBack: number;
  let prevDaysBack: number;
  
  switch (timeRange) {
    case '24H':
      daysBack = 1;
      prevDaysBack = 2;
      break;
    case '7D':
      daysBack = 7;
      prevDaysBack = 14;
      break;
    case '30D':
      daysBack = 30;
      prevDaysBack = 60;
      break;
  }
  
  // Generate date keys for current period
  const currentDates: string[] = [];
  const previousDates: string[] = [];
  
  for (let i = 0; i < daysBack; i++) {
    currentDates.push(getDateKey(subtractDays(now, i)));
  }
  
  for (let i = daysBack; i < prevDaysBack; i++) {
    previousDates.push(getDateKey(subtractDays(now, i)));
  }
  
  // Fetch current period data
  let currentVisitors = 0;
  let currentPageViews = 0;
  let previousVisitors = 0;
  let previousPageViews = 0;
  
  const chartVisitors: number[] = [];
  const chartPageViews: number[] = [];
  const chartLabels: string[] = [];
  const allPageStats: Record<string, number> = {};
  
  // Current period — gather per-day data for chart
  for (const dateKey of currentDates.reverse()) {
    // Visitors for this day
    try {
      const visitorsSnap = await get(ref(database, `analytics/visitors/${dateKey}`));
      const dayVisitors = visitorsSnap.exists() ? Object.keys(visitorsSnap.val()).length : 0;
      currentVisitors += dayVisitors;
      chartVisitors.push(dayVisitors);
    } catch {
      chartVisitors.push(0);
    }
    
    // Page views for this day
    try {
      const pvSnap = await get(ref(database, `analytics/pageViews/${dateKey}`));
      const dayPageViews = pvSnap.exists() ? Object.keys(pvSnap.val()).length : 0;
      currentPageViews += dayPageViews;
      chartPageViews.push(dayPageViews);
    } catch {
      chartPageViews.push(0);
    }
    
    // Page stats for top pages
    try {
      const pageSnap = await get(ref(database, `analytics/pageStats/${dateKey}`));
      if (pageSnap.exists()) {
        const pages = pageSnap.val();
        for (const [encodedPath, data] of Object.entries(pages)) {
          const path = decodeURIComponent(encodedPath);
          allPageStats[path] = (allPageStats[path] || 0) + (data as { views: number }).views;
        }
      }
    } catch {
      // skip
    }
    
    // Label for chart
    if (timeRange === '24H') {
      chartLabels.push('Today');
    } else {
      const d = new Date(dateKey);
      chartLabels.push(`${d.getMonth() + 1}/${d.getDate()}`);
    }
  }
  
  // Previous period — just totals for comparison
  for (const dateKey of previousDates) {
    try {
      const visitorsSnap = await get(ref(database, `analytics/visitors/${dateKey}`));
      if (visitorsSnap.exists()) {
        previousVisitors += Object.keys(visitorsSnap.val()).length;
      }
    } catch { /* skip */ }
    
    try {
      const pvSnap = await get(ref(database, `analytics/pageViews/${dateKey}`));
      if (pvSnap.exists()) {
        previousPageViews += Object.keys(pvSnap.val()).length;
      }
    } catch { /* skip */ }
  }
  
  // Calculate percentage changes
  const visitorChange = previousVisitors > 0 
    ? Math.round(((currentVisitors - previousVisitors) / previousVisitors) * 100) 
    : currentVisitors > 0 ? 100 : 0;
    
  const pageViewChange = previousPageViews > 0 
    ? Math.round(((currentPageViews - previousPageViews) / previousPageViews) * 100) 
    : currentPageViews > 0 ? 100 : 0;
  
  // Top pages
  const topPages = Object.entries(allPageStats)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  
  return {
    visitors: currentVisitors,
    visitorChange,
    pageViews: currentPageViews,
    pageViewChange,
    chartSeries: {
      visitors: chartVisitors,
      pageViews: chartPageViews,
      labels: chartLabels,
    },
    topPages,
  };
};

// ── Real-time listener for live updates ──
export const subscribeToAnalytics = (
  timeRange: TimeRange, 
  callback: (data: AnalyticsData) => void
): (() => void) => {
  if (!database) {
    return () => {};
  }

  const now = new Date();
  const dateKey = getDateKey(now);
  
  // Listen to today's data for live updates
  const visitorsRef = ref(database, `analytics/visitors/${dateKey}`);
  const pageViewsRef = ref(database, `analytics/pageViews/${dateKey}`);
  
  const handleUpdate = () => {
    fetchAnalytics(timeRange).then(callback);
  };
  
  onValue(visitorsRef, handleUpdate);
  onValue(pageViewsRef, handleUpdate);
  
  // Return unsubscribe function
  return () => {
    off(visitorsRef);
    off(pageViewsRef);
  };
};
