import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ProjectionSet } from '../types/calculator';

interface ProjectionChartProps {
  projections: ProjectionSet;
  title: string;
}

export function ProjectionChart({ projections, title }: ProjectionChartProps) {
  const chartData = useMemo(() => {
    return projections.months.map((month, index) => ({
      name: `Month ${index + 1}`,
      Revenue: month.totalRevenue,
      Expenses: month.totalExpenses,
      Profit: month.profitLoss,
    }));
  }, [projections]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 w-full border-[3px] border-green-500/30">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {title} Projection
      </h3>
      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#22c55e20" />
            <XAxis 
              dataKey="name"
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value)]}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #22c55e40',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(34, 197, 94, 0.1)'
              }}
            />
            <Legend 
              wrapperStyle={{
                paddingTop: '10px'
              }}
            />
            <Line
              type="monotone"
              dataKey="Revenue"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4, fill: '#22c55e' }}
              activeDot={{ r: 8, fill: '#22c55e' }}
            />
            <Line
              type="monotone"
              dataKey="Expenses"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4, fill: '#ef4444' }}
            />
            <Line
              type="monotone"
              dataKey="Profit"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 