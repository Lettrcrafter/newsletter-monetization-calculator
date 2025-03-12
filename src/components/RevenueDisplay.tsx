import { RevenueModel } from '../types/calculator';
import { DollarSign } from 'lucide-react';

interface RevenueDisplayProps {
  revenue: RevenueModel;
}

export function RevenueDisplay({ revenue }: RevenueDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Projected Revenue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Upscribe Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${revenue.upscribeRevenue.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Paid Subscriptions</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${revenue.paidSubscriptions.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Sponsorships</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${revenue.sponsorships.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Affiliate Sales</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${revenue.affiliateSales.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">High Ticket Offerings</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${revenue.highTicketOfferings.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-800">Total Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${revenue.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-gray-700">Expenses</h3>
            <p className="text-xl font-bold text-red-600">
              -${revenue.expenses.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700">Net Profit</h3>
            <p className="text-xl font-bold text-green-600">
              ${revenue.profit.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}