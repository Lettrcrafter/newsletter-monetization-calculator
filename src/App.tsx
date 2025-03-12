import { useState } from 'react';
import { StatsInput } from './components/StatsInput';
import { RevenueDisplay } from './components/RevenueDisplay';
import { NewsletterStats, RevenueModel, RISK_LEVELS } from './types/calculator';
import { Calculator } from 'lucide-react';

function App() {
  const [stats, setStats] = useState<NewsletterStats>({
    existingSubscribers: 1000,
    openRate: 50,
    clickRate: 2,
    subscribersFromSEO: 10
  });

  const [selectedRisk, setSelectedRisk] = useState(1); // Moderate by default

  const calculateRevenue = (stats: NewsletterStats, riskMultiplier: number): RevenueModel => {
    // This is a simplified calculation - you'll want to implement the full logic
    const monthlyRevenue = stats.existingSubscribers * 2 * riskMultiplier;
    const expenses = 5000; // Base expenses

    return {
      upscribeRevenue: monthlyRevenue * 0.2,
      paidSubscriptions: monthlyRevenue * 0.3,
      sponsorships: monthlyRevenue * 0.2,
      affiliateSales: monthlyRevenue * 0.2,
      highTicketOfferings: monthlyRevenue * 0.1,
      totalRevenue: monthlyRevenue,
      expenses: expenses,
      profit: monthlyRevenue - expenses
    };
  };

  const revenue = calculateRevenue(stats, RISK_LEVELS[selectedRisk].multiplier);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-12 h-12 text-green-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Newsletter Monetization Calculator
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Predict your newsletter's revenue potential and optimize your monetization strategy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <StatsInput stats={stats} onChange={setStats} />
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-green-800 mb-4">Risk Tolerance</h2>
              <div className="grid grid-cols-3 gap-4">
                {RISK_LEVELS.map((risk, index) => (
                  <button
                    key={risk.label}
                    onClick={() => setSelectedRisk(index)}
                    className={`p-4 rounded-lg ${
                      selectedRisk === index
                        ? 'ring-2 ring-green-500 ' + risk.color
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <p className="font-semibold">{risk.label}</p>
                    <p className="text-sm text-gray-600">
                      {(risk.multiplier * 100).toFixed(0)}% multiplier
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <RevenueDisplay revenue={revenue} />
        </div>
      </div>
    </div>
  );
}

export default App;