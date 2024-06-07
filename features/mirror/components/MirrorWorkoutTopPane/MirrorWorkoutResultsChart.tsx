'use client';
import { useMemo } from 'react';
import Chart from 'react-google-charts';
import { MirrorWorkoutResult } from '../../schema';
type Props = { results: MirrorWorkoutResult[] };

const MirrorWorkoutResultsChart = ({ results }: Props) => {
  const lineChartData = useMemo(() => {
    return results.map((r) => {
      return [r.created_at, r.totalTime / 1000];
    });
  }, [results]);

  const columnChartData = useMemo(() => {
    return results.map((r) => {
      return [r.created_at, r.correctRatio];
    });
  }, [results]);

  return (
    <div className='grid gap-8'>
      <Chart
        chartType='LineChart'
        data={[['日付', '時間'], ...lineChartData]}
        chartLanguage='zh-TW'
        options={{
          title: '時間',
          curveType: 'function',
          hAxis: {
            minValue: new Date('2024-06-07'),
            maxValue: new Date('2024-6-13'),
            format: 'M/d',
          },
          legend: { position: 'none' },
        }}
      />
      <Chart
        chartType='ColumnChart'
        data={[['日付', '正答率'], ...columnChartData]}
        options={{
          title: '正答率',
          vAxis: { maxValue: 100, minValue: 0 },
          hAxis: {
            minValue: new Date('2024-06-07'),
            maxValue: new Date('2024-6-13'),
            format: 'M/d',
          },
          legend: { position: 'none' },
        }}
      />
    </div>
  );
};

export default MirrorWorkoutResultsChart;
