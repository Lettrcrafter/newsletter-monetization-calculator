import { CalculatorState, MonthlyProjection, ProjectionSet } from '../types/calculator';

function calculateMonthlyProjection(
  state: CalculatorState,
  month: number,
  type: 'low' | 'mid' | 'high' | 'flywheel',
  previousMonth?: MonthlyProjection
): MonthlyProjection {
  const {
    stats,
    upscribe,
    paidSubscriptions,
    sponsorships,
    highTicketOffering,
    affiliateSales,
    adCosts,
    expenses
  } = state;

  // Base optimization multipliers from spreadsheet
  const baseMultipliers = {
    low: [1.00, 1.20, 1.00, 1.20, 1.00, 1.00, 1.00, 1.20, 1.00, 1.20, 1.00, 1.00],
    mid: [1.00, 1.20, 1.02, 1.00, 1.10, 1.20, 1.10, 1.10, 1.10, 1.20, 1.00, 1.00],
    high: [1.00, 1.20, 1.02, 1.00, 1.10, 1.20, 1.10, 1.10, 1.10, 1.20, 1.00, 1.10],
    flywheel: [1.00, 1.20, 1.02, 1.00, 1.10, 1.20, 1.10, 1.10, 1.00, 1.00, 1.10, 1.00]
  };

  // Get optimization multiplier for current month
  const optimizationMultiplier = baseMultipliers[type][month];

  // Calculate ad optimization based on previous month's multiplier
  const adOptimization = previousMonth ? 
    (optimizationMultiplier > 1 ? (optimizationMultiplier - 1) : 0) : 
    0;

  // Calculate cost per subscriber based on type and optimization
  let costPerSub = type === 'flywheel' ? adCosts.low : adCosts[type];
  if (adOptimization > 0) {
    costPerSub *= (1 - adOptimization);
  }

  // Calculate ad spend and profit reinvestment
  let adSpend = expenses.adSpendBudget;
  let profitReinvestment = 0;

  if (type === 'flywheel' && month >= 6 && previousMonth?.profitLoss) {
    profitReinvestment = previousMonth.profitLoss * 0.25; // 25% of previous month's profit
    adSpend += profitReinvestment;
  }

  // Calculate subscriber numbers
  const adSubs = Math.floor(adSpend / costPerSub);
  const seoSubs = stats.subscribersFromSEO;
  const altSourceSubs = 0; // Not used in current model
  
  // Calculate referral rate and subs
  const referralRate = type === 'flywheel' ? 
    (month >= 6 ? 0.5 : 0.4) : 
    (month >= 6 ? 0.5 : 
      month >= 3 ? 0.4 : 0.3);
  
  const referralSubs = Math.floor((adSubs + seoSubs + altSourceSubs) * referralRate);
  const totalNewSubs = adSubs + seoSubs + altSourceSubs + referralSubs;

  // Calculate total subscribers
  const totalSubs = (previousMonth?.totalSubs || stats.existingSubscribers) + totalNewSubs;

  // Calculate upscribe revenue
  const upscribeRevenue = totalNewSubs * (type === 'low' ? upscribe.lowVariable : 
    type === 'mid' ? upscribe.midVariable : upscribe.highVariable);

  // Calculate paid subscription metrics
  const paidSubsConversion = type === 'flywheel' ? 
    (month >= 9 ? 0.08 : month >= 6 ? 0.07 : 0.06) :
    (month >= 6 ? 0.12 : 0.06);
  
  const paidSubs = Math.floor(totalSubs * paidSubsConversion);
  const paidSubsRevenue = paidSubs * paidSubscriptions.revenuePerSub;

  // Calculate engagement metrics
  const totalOpens = Math.floor(totalSubs * stats.openRate);
  const clicks = Math.floor(totalOpens * stats.clickRate);

  // Calculate affiliate sales metrics
  const conversionRate = type === 'flywheel' ? 
    affiliateSales.conversionRates.high :
    affiliateSales.conversionRates[type];
  const salesConversions = Math.floor(clicks * conversionRate);
  const affiliateSalesIncome = salesConversions * affiliateSales.revenuePerSale;

  // Calculate high ticket revenue
  const highTicketRevenue = Math.floor(totalSubs / highTicketOffering.subscribersToConvert) * highTicketOffering.price;

  // Calculate sponsorship revenue
  const sponsorshipRevenue = totalSubs >= sponsorships.minSubscribers ? 
    (type === 'flywheel' ? sponsorships.flywheel :
      type === 'high' ? sponsorships.high :
      type === 'mid' ? sponsorships.mid :
      sponsorships.low) : 0;

  // Calculate total revenue
  const totalRevenue = upscribeRevenue + paidSubsRevenue + affiliateSalesIncome + highTicketRevenue + sponsorshipRevenue;

  // Calculate expenses and profit
  const totalExpenses = expenses.total + adSpend;
  const profitLoss = totalRevenue - totalExpenses;

  // Calculate cumulative metrics
  const expensesCumulative = (previousMonth?.expensesCumulative || 0) + totalExpenses;
  const revenueCumulative = (previousMonth?.revenueCumulative || 0) + totalRevenue;
  const profitCumulative = revenueCumulative - expensesCumulative;

  return {
    optimizationMultiplier,
    expenses: expenses.total,
    adSpend,
    profitReinvestment,
    costPerSub,
    adOptimization,
    adSubs,
    seoSubs,
    altSourceSubs,
    referralRate,
    referralSubs,
    totalNewSubs,
    upscribeRevenue,
    totalSubs,
    paidSubsConversion,
    paidSubs,
    paidSubsRevenue,
    totalOpens,
    clicks,
    salesConversions,
    affiliateSalesIncome,
    highTicketRevenue,
    sponsorshipRevenue,
    totalRevenue,
    totalExpenses,
    profitLoss,
    expensesCumulative,
    revenueCumulative,
    profitCumulative
  };
}

export function calculateProjections(state: CalculatorState): {
  low: ProjectionSet;
  mid: ProjectionSet;
  high: ProjectionSet;
  flywheel: ProjectionSet;
} {
  const projectionTypes = ['low', 'mid', 'high', 'flywheel'] as const;
  const months = Array.from({ length: 12 }, (_, i) => i);

  const projections = projectionTypes.reduce((acc, type) => {
    const monthlyProjections = months.reduce((monthAcc, month) => {
      const previousMonth = month > 0 ? monthAcc[month - 1] : undefined;
      const projection = calculateMonthlyProjection(state, month, type, previousMonth);
      return [...monthAcc, projection];
    }, [] as MonthlyProjection[]);

    return {
      ...acc,
      [type]: {
        type,
        months: monthlyProjections
      }
    };
  }, {} as Record<typeof projectionTypes[number], ProjectionSet>);

  return projections;
} 