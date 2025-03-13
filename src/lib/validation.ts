import { CalculatorState } from '../types/calculator';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateStats(stats: CalculatorState['stats']): ValidationError[] {
  const errors: ValidationError[] = [];

  if (stats.existingSubscribers < 0) {
    errors.push({ field: 'existingSubscribers', message: 'Must be 0 or greater' });
  }

  if (stats.openRate < 0 || stats.openRate > 1) {
    errors.push({ field: 'openRate', message: 'Must be between 0 and 1' });
  }

  if (stats.clickRate < 0 || stats.clickRate > 1) {
    errors.push({ field: 'clickRate', message: 'Must be between 0 and 1' });
  }

  if (stats.subscribersFromSEO < 0) {
    errors.push({ field: 'subscribersFromSEO', message: 'Must be 0 or greater' });
  }

  return errors;
}

export function validateRevenueSources(state: CalculatorState): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate Upscribe
  if (state.upscribe.lowVariable < 0) {
    errors.push({ field: 'upscribe.lowVariable', message: 'Must be 0 or greater' });
  }
  if (state.upscribe.midVariable < 0) {
    errors.push({ field: 'upscribe.midVariable', message: 'Must be 0 or greater' });
  }
  if (state.upscribe.highVariable < 0) {
    errors.push({ field: 'upscribe.highVariable', message: 'Must be 0 or greater' });
  }

  // Validate Paid Subscriptions
  ['lowTier', 'midTier', 'highTier'].forEach(tier => {
    const tierData = state.paidSubscriptions[tier as 'lowTier' | 'midTier' | 'highTier'];
    if (tierData.cost < 0) {
      errors.push({ field: `paidSubscriptions.${tier}.cost`, message: 'Must be 0 or greater' });
    }
    if (tierData.subscribers < 0) {
      errors.push({ field: `paidSubscriptions.${tier}.subscribers`, message: 'Must be 0 or greater' });
    }
  });

  // Validate Sponsorships
  if (state.sponsorships.minSubscribers < 0) {
    errors.push({ field: 'sponsorships.minSubscribers', message: 'Must be 0 or greater' });
  }
  ['low', 'mid', 'high', 'flywheel'].forEach(level => {
    if (state.sponsorships[level as keyof typeof state.sponsorships] < 0) {
      errors.push({ field: `sponsorships.${level}`, message: 'Must be 0 or greater' });
    }
  });

  // Validate High Ticket Offering
  if (state.highTicketOffering.price < 0) {
    errors.push({ field: 'highTicketOffering.price', message: 'Must be 0 or greater' });
  }
  if (state.highTicketOffering.conversionRate < 0 || state.highTicketOffering.conversionRate > 1) {
    errors.push({ field: 'highTicketOffering.conversionRate', message: 'Must be between 0 and 1' });
  }
  if (state.highTicketOffering.subscribersToConvert < 0) {
    errors.push({ field: 'highTicketOffering.subscribersToConvert', message: 'Must be 0 or greater' });
  }

  // Validate Affiliate Sales
  if (state.affiliateSales.openRate < 0 || state.affiliateSales.openRate > 1) {
    errors.push({ field: 'affiliateSales.openRate', message: 'Must be between 0 and 1' });
  }
  if (state.affiliateSales.clickThroughRate < 0 || state.affiliateSales.clickThroughRate > 1) {
    errors.push({ field: 'affiliateSales.clickThroughRate', message: 'Must be between 0 and 1' });
  }
  Object.entries(state.affiliateSales.conversionRates).forEach(([level, rate]) => {
    if (rate < 0 || rate > 1) {
      errors.push({ field: `affiliateSales.conversionRates.${level}`, message: 'Must be between 0 and 1' });
    }
  });
  if (state.affiliateSales.salePrice < 0) {
    errors.push({ field: 'affiliateSales.salePrice', message: 'Must be 0 or greater' });
  }
  if (state.affiliateSales.commissionRate < 0 || state.affiliateSales.commissionRate > 1) {
    errors.push({ field: 'affiliateSales.commissionRate', message: 'Must be between 0 and 1' });
  }

  return errors;
}

export function validateExpenses(expenses: CalculatorState['expenses']): ValidationError[] {
  const errors: ValidationError[] = [];

  if (expenses.contentAndESP < 0) {
    errors.push({ field: 'contentAndESP', message: 'Must be 0 or greater' });
  }
  if (expenses.seo < 0) {
    errors.push({ field: 'seo', message: 'Must be 0 or greater' });
  }
  if (expenses.adManagement < 0) {
    errors.push({ field: 'adManagement', message: 'Must be 0 or greater' });
  }
  if (expenses.adSpendBudget < 0) {
    errors.push({ field: 'adSpendBudget', message: 'Must be 0 or greater' });
  }

  return errors;
}

export function validateCalculatorState(state: CalculatorState): ValidationError[] {
  return [
    ...validateStats(state.stats),
    ...validateRevenueSources(state),
    ...validateExpenses(state.expenses)
  ];
} 