import { ChartConfig } from '@/components/ui/chart';

export const CHART_CONFIG: ChartConfig = {
  rating: {
    label: 'Rating',
  },
  excellent: {
    label: 'Excellent',
    color: 'hsl(var(--chart-1))',
  },
  good: {
    label: 'Good',
    color: 'hsl(var(--chart-2))',
  },
  average: {
    label: 'Average',
    color: 'hsl(var(--chart-3))',
  },
  poor: {
    label: 'Poor',
    color: 'hsl(var(--chart-4))',
  },
  terrible: {
    label: 'Terrible',
    color: 'hsl(var(--chart-5))',
  },
};
