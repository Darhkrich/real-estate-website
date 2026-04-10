'use client';

import { usePageView, useFbPageView } from './Analytics';

export default function PageViewTracker() {
  usePageView();
  useFbPageView();
  return null;
}