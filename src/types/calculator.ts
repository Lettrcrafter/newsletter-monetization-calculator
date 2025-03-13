export interface NewsletterStats {
  existingSubscribers: number;
  openRate: number;
  clickRate: number;
  subscribersFromSEO: number;
}

export interface UpscribeRevenue {
  lowVariable: number;
  midVariable: number;
  highVariable: number;
}

export interface PaidSubscriptionTier {
  cost: number;
  subscribers: number;
  value: number;
}

export interface PaidSubscriptions {
  lowTier: PaidSubscriptionTier;
  midTier: PaidSubscriptionTier;
  highTier: PaidSubscriptionTier;
  revenuePerSub: number;
}

export interface MonthlySponsorship {
  low: number;
  mid: number;
  high: number;
  flywheel: number;
  minSubscribers: number;
}

export interface HighTicketOffering {
  price: number;
  conversionRate: number;
  subscribersToConvert: number;
  valuePerSubscriber: number;
}

export interface AffiliateSales {
  openRate: number;
  clickThroughRate: number;
  conversionRates: {
    low: number;
    mid: number;
    high: number;
  };
  salePrice: number;
  commissionRate: number;
  revenuePerSale: number;
}

export interface AdCosts {
  low: number;  // High cost, low profit
  mid: number;
  high: number; // Low cost, high profit
}

export interface MonthlyExpenses {
  contentAndESP: number;
  seo: number;
  adManagement: number;
  total: number;
  adSpendBudget: number;
}

export interface MonthlyProjection {
  optimizationMultiplier: number;
  expenses: number;
  adSpend: number;
  profitReinvestment: number;
  costPerSub: number;
  adOptimization: number;
  adSubs: number;
  seoSubs: number;
  altSourceSubs: number;
  referralRate: number;
  referralSubs: number;
  totalNewSubs: number;
  upscribeRevenue: number;
  totalSubs: number;
  paidSubsConversion: number;
  paidSubs: number;
  paidSubsRevenue: number;
  totalOpens: number;
  clicks: number;
  salesConversions: number;
  affiliateSalesIncome: number;
  highTicketRevenue: number;
  sponsorshipRevenue: number;
  totalRevenue: number;
  totalExpenses: number;
  profitLoss: number;
  expensesCumulative: number;
  revenueCumulative: number;
  profitCumulative: number;
}

export interface ProjectionSet {
  months: MonthlyProjection[];
  type: 'low' | 'mid' | 'high' | 'flywheel';
}

export interface CalculatorState {
  stats: NewsletterStats;
  upscribe: UpscribeRevenue;
  paidSubscriptions: PaidSubscriptions;
  sponsorships: MonthlySponsorship;
  highTicketOffering: HighTicketOffering;
  affiliateSales: AffiliateSales;
  adCosts: AdCosts;
  expenses: MonthlyExpenses;
  projections: {
    low: ProjectionSet;
    mid: ProjectionSet;
    high: ProjectionSet;
    flywheel: ProjectionSet;
  };
}

export interface RiskLevel {
  label: string;
  multiplier: number;
  color: string;
}

export const RISK_LEVELS: RiskLevel[] = [
  { label: 'Conservative', multiplier: 0.7, color: 'bg-green-100 dark:bg-green-900' },
  { label: 'Moderate', multiplier: 1.0, color: 'bg-yellow-100 dark:bg-yellow-900' },
  { label: 'Aggressive', multiplier: 1.3, color: 'bg-red-100 dark:bg-red-900' }
];