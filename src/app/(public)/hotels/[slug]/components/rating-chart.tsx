import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  ChartContainer,
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
    },
    {
      rating: 'Good',
      number: histogram[3],
      fill: 'var(--color-chart-2)',
    },
    {
      rating: 'Average',
      number: histogram[2],
      fill: 'var(--color-chart-3)',
    },
    {
      rating: 'Poor',
      number: histogram[1],
      fill: 'var(--color-chart-4)',
    },
    {
      rating: 'Terrible',
      number: histogram[0],
      fill: 'var(--color-chart-5)',
    },
  ];

  const total = useMemo(
    () => histogram.reduce((acc, curr) => acc + curr, 0),
    [histogram],
  );

  return (
    <div className='mx-auto aspect-square h-full max-h-64'>
      <ChartContainer config={CHART_CONFIG} className='aspect-square'>
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
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
        </PieChart>
      </ChartContainer>
    </div>
  );
}
