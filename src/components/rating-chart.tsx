import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_CONFIG } from '@/constants/chart-config';
import { IChartData } from '@/types/IChartData';

type Props = {
  histogram: number[];
};

export default function RatingChart({ histogram }: Props) {
  const data: IChartData[] = [
    {
      rating: 'Excellent',
      number: histogram[4],
      fill: 'var(--color-chart-1)',
      browser: 'excellent',
    },
    {
      rating: 'Good',
      number: histogram[3],
      fill: 'var(--color-chart-2)',
      browser: 'good',
    },
    {
      rating: 'Average',
      number: histogram[2],
      fill: 'var(--color-chart-3)',
      browser: 'average',
    },
    {
      rating: 'Poor',
      number: histogram[1],
      fill: 'var(--color-chart-4)',
      browser: 'poor',
    },
    {
      rating: 'Terrible',
      number: histogram[0],
      fill: 'var(--color-chart-5)',
      browser: 'terrible',
    },
  ];

  const total = useMemo(
    () => histogram.reduce((acc, curr) => acc + curr, 0),
    [histogram],
  );

  return (
    <div className='mx-auto aspect-square h-full max-h-80 min-h-60 w-auto'>
      <ChartContainer config={CHART_CONFIG} className='aspect-square'>
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey='number'
            nameKey='rating'
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor='middle'
                      dominantBaseline='middle'
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className='fill-foreground text-3xl font-bold'
                      >
                        {total.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className='fill-muted-foreground'
                      >
                        Ratings
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </Pie>
          <ChartLegend content={<ChartLegendContent nameKey='browser' />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
