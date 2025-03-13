import { ProjectionSet } from '../types/calculator';
import { Card } from './ui/card';
import { Tooltip } from './ui/tooltip';
import { TrendingUp, DollarSign, Users, Mail } from 'lucide-react';

interface ProjectionsDisplayProps {
  projections: ProjectionSet;
  title: string;
}

export function ProjectionsDisplay({ projections, title }: ProjectionsDisplayProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPercent = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title} Projections</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projections.months.map((month, index) => (
          <Card key={index} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Month {index + 1}</h4>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  month.profitLoss >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {month.profitLoss >= 0 ? 'Profit' : 'Loss'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>New Subscribers</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatNumber(month.totalNewSubs)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>Total Subscribers</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatNumber(month.totalSubs)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>Open Rate</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatPercent(month.totalOpens / month.totalSubs)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>Conversion</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatPercent(month.paidSubsConversion)}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Revenue</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(month.totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Expenses</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(month.totalExpenses)}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Profit/Loss</span>
                  <span className={`text-sm font-medium ${
                    month.profitLoss >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(month.profitLoss)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Cumulative Profit</span>
                  <span className={`text-sm font-medium ${
                    month.profitCumulative >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {formatCurrency(month.profitCumulative)}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 