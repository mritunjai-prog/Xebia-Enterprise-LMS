import { createFileRoute } from '@tanstack/react-router';
import { AnalyticsShell } from '@/admin/features/analytics/components/layout/AnalyticsShell';

export const Route = createFileRoute('/admin/analytics')({
  component: AnalyticsShell,
});
