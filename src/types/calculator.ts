export interface NewsletterStats {
  existingSubscribers: number;
  openRate: number;
  clickRate: number;
  subscribersFromSEO: number;
}

export interface RevenueModel {
  upscribeRevenue: number;
  paidSubscriptions: number;
  sponsorships: number;
  affiliateSales: number;
  highTicketOfferings: number;
  totalRevenue: number;
  expenses: number;
  profit: number;
}

export interface RiskLevel {
  label: string;
  multiplier: number;
  color: string;
}

export const RISK_LEVELS: RiskLevel[] = [
  { label: 'Conservative', multiplier: 0.7, color: 'bg-green-100' },
  { label: 'Moderate', multiplier: 1.0, color: 'bg-yellow-100' },
  { label: 'Aggressive', multiplier: 1.3, color: 'bg-red-100' }
];