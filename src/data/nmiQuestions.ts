export interface NMIQuestion {
  id: string;
  text: string;
  description?: string;
}

export const nmiQuestions: NMIQuestion[] = [
  {
    id: 'free_subscribers',
    text: 'Access to Free Subscribers (Partnerships)',
    description: 'How easily can you acquire subscribers through partnerships and collaborations?'
  },
  {
    id: 'public_lists',
    text: 'Access to Public or Cheap Lists',
    description: 'Can you find and utilize existing email lists in your niche?'
  },
  {
    id: 'organic_referral',
    text: 'Organic Referral Potential',
    description: 'How likely are subscribers to share your newsletter with others?'
  },
  {
    id: 'industry_ad_spend',
    text: 'Industry Ad Spend',
    description: 'How much do companies in this niche typically spend on advertising?'
  },
  {
    id: 'high_ltv_audience',
    text: 'High LTV Audience',
    description: 'What is the potential lifetime value of your subscribers?'
  },
  {
    id: 'paid_subscription',
    text: 'Paid Subscription Viability',
    description: 'How likely are subscribers to pay for premium content?'
  },
  {
    id: 'affiliate_sponsorship',
    text: 'Affiliate & Sponsorship Potential',
    description: 'How strong are the monetization opportunities through partnerships?'
  },
  {
    id: 'targeting_ease',
    text: 'Ease of Targeting Subs (Paid Ads)',
    description: 'How precisely can you target potential subscribers?'
  },
  {
    id: 'growth_hacks',
    text: 'Low-Cost Growth Hacks',
    description: 'Are there creative, cost-effective ways to grow in this niche?'
  },
  {
    id: 'cold_email',
    text: 'Cold Email Viability',
    description: 'How effective would cold outreach be in this niche?'
  },
  {
    id: 'market_gap',
    text: 'Market Gap & Opportunity',
    description: 'Is there an unfilled need in this market?'
  },
  {
    id: 'industry_growth',
    text: 'Trend & Industry Growth',
    description: 'Is this niche growing or declining?'
  },
  {
    id: 'content_sourcing',
    text: 'Ease of Content Sourcing',
    description: 'How easily can you create or find valuable content?'
  },
  {
    id: 'product_potential',
    text: 'In-House Product Potential',
    description: 'Could you create and sell your own products?'
  },
  {
    id: 'automation_potential',
    text: 'Automation & AI Potential',
    description: 'Can parts of your operation be automated?'
  },
  {
    id: 'growth_speed',
    text: 'How fast can you get to 100k subscribers?',
    description: 'Rate the potential speed of audience growth'
  },
  {
    id: 'acquisition_costs',
    text: 'How quickly can you cover acquisition costs?',
    description: 'Rate the potential for quick ROI on marketing spend'
  },
  {
    id: 'audience_size',
    text: 'What is the size of the potential audience?',
    description: 'How large is your total addressable market?'
  },
  {
    id: 'content_need',
    text: 'How badly does the audience "need" your content?',
    description: 'Is your content nice-to-have or must-have?'
  },
  {
    id: 'virality',
    text: 'Virality Potential',
    description: 'How likely is your content to go viral?'
  }
]; 