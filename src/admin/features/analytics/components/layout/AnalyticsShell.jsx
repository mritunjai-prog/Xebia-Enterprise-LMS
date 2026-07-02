import React, { Suspense } from 'react';
import { AnalyticsFilterProvider } from '../../context/AnalyticsFilterContext';
import { FilterBar } from './FilterBar';
import { Outlet, Link, useRouterState } from '@tanstack/react-router';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

const analyticsLinks = [
  { path: '/admin/analytics/executive', label: 'Executive Summary' },
  { path: '/admin/analytics/coverage', label: 'Learning Coverage' },
  { path: '/admin/analytics/hours', label: 'Learning Hours' },
  { path: '/admin/analytics/pillars', label: 'Learning Pillars' },
  { path: '/admin/analytics/ai', label: 'AI Transformation' },
  { path: '/admin/analytics/certifications', label: 'Certifications' },
  { path: '/admin/analytics/flagship', label: 'Flagship Programs' },
  { path: '/admin/analytics/trends', label: 'Learning Trends' },
  { path: '/admin/analytics/effectiveness', label: 'Training Effectiveness' },
  { path: '/admin/analytics/champions', label: 'Learning Champions' },
  { path: '/admin/analytics/projects', label: 'Project Investment' },
  { path: '/admin/analytics/journey', label: 'Fresher Journey' },
];

export function AnalyticsShell() {
  return (
    <AnalyticsFilterProvider>
      <div className="flex flex-col gap-6 animate-in fade-in duration-500 min-h-[calc(100vh-100px)] w-full">
        {/* Main Content Area */}
        <div className="flex-1 w-full overflow-hidden flex flex-col">
          <FilterBar />
          
          <div className="flex-1">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-sm font-bold animate-pulse">Loading dashboard modules...</p>
              </div>
            }>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
    </AnalyticsFilterProvider>
  );
}
