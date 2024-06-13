'use client';
import { useMemo } from 'react';
import Chart from 'react-google-charts';
import { MirrorWorkoutResult } from '../../schema';
import { convertTimezone_TW } from '../../services/utils';
type Props = { results: MirrorWorkoutResult[] };

const MirrorWorkoutResultsChart = ({ results }: Props) => {
  if (!results.length) return null;

  const lineChartData = useMemo(() => {
    return results.map((r) => {
      return [convertTimezone_TW(r.created_at), r.totalTime / 1000];
    });
  }, [results]);

  const columnChartData = useMemo(() => {
    return results.map((r) => {
      return [convertTimezone_TW(r.created_at), r.correctRatio];
    });
  }, [results]);

  return (
    <div className='grid gap-8'>
      <Chart
        chartType='LineChart'
        data={[['日付', '時間'], ...lineChartData]}
        options={{
          title: '時間',
          curveType: 'function',
          hAxis: {
            format: 'M/d',
            minValue: new Date('2024-06-07'),
            maxValue: new Date(),
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
            format: 'M/d',
            minValue: new Date('2024-06-07'),
            maxValue: new Date(),
          },
          legend: { position: 'none' },
        }}
      />
    </div>
  );
};

export default MirrorWorkoutResultsChart;
