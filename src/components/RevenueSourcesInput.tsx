import { useState } from 'react';
import { UpscribeRevenue, PaidSubscriptions, MonthlySponsorship, HighTicketOffering, AffiliateSales } from '../types/calculator';
import { ValidationError } from '../lib/validation';

interface RevenueSourcesInputProps {
  upscribe: UpscribeRevenue;
  paidSubscriptions: PaidSubscriptions;
  sponsorships: MonthlySponsorship;
  highTicketOffering: HighTicketOffering;
  affiliateSales: AffiliateSales;
  onUpscribeChange: (upscribe: UpscribeRevenue) => void;
  onPaidSubscriptionsChange: (paidSubscriptions: PaidSubscriptions) => void;
  onSponsorshipsChange: (sponsorships: MonthlySponsorship) => void;
  onHighTicketChange: (highTicketOffering: HighTicketOffering) => void;
  onAffiliateSalesChange: (affiliateSales: AffiliateSales) => void;
  errors?: ValidationError[];
}

export function RevenueSourcesInput({
  upscribe,
  paidSubscriptions,
  sponsorships,
  highTicketOffering,
  affiliateSales,
  onUpscribeChange,
  onPaidSubscriptionsChange,
  onSponsorshipsChange,
  onHighTicketChange,
  onAffiliateSalesChange,
  errors = []
}: RevenueSourcesInputProps) {
  const getErrorMessage = (field: string) => {
    const error = errors.find(e => e.field === field);
    return error?.message;
  };

  const getInputClassName = (field: string) => `mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
    getErrorMessage(field)
      ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50'
      : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
  } dark:text-white`;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Revenue Sources</h2>
      
      {/* Upscribe Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Upscribe Revenue</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Averaged over 100 subs assuming a 50% uptake per 100 subs.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Low Variable</label>
            <input
              type="number"
              value={upscribe.lowVariable}
              onChange={(e) => onUpscribeChange({ ...upscribe, lowVariable: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('upscribe.lowVariable')}
            />
            {getErrorMessage('upscribe.lowVariable') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('upscribe.lowVariable')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mid Variable</label>
            <input
              type="number"
              value={upscribe.midVariable}
              onChange={(e) => onUpscribeChange({ ...upscribe, midVariable: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('upscribe.midVariable')}
            />
            {getErrorMessage('upscribe.midVariable') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('upscribe.midVariable')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">High Variable</label>
            <input
              type="number"
              value={upscribe.highVariable}
              onChange={(e) => onUpscribeChange({ ...upscribe, highVariable: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('upscribe.highVariable')}
            />
            {getErrorMessage('upscribe.highVariable') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('upscribe.highVariable')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Paid Subscriptions Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Paid Subscriptions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Low Tier */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Low Tier</h4>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Cost</label>
              <input
                type="number"
                value={paidSubscriptions.lowTier.cost}
                onChange={(e) => onPaidSubscriptionsChange({
                  ...paidSubscriptions,
                  lowTier: { ...paidSubscriptions.lowTier, cost: parseFloat(e.target.value) || 0 }
                })}
                className={getInputClassName('paidSubscriptions.lowTier.cost')}
              />
              {getErrorMessage('paidSubscriptions.lowTier.cost') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('paidSubscriptions.lowTier.cost')}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Subscribers</label>
              <input
                type="number"
                value={paidSubscriptions.lowTier.subscribers}
                onChange={(e) => onPaidSubscriptionsChange({
                  ...paidSubscriptions,
                  lowTier: { ...paidSubscriptions.lowTier, subscribers: parseFloat(e.target.value) || 0 }
                })}
                className={getInputClassName('paidSubscriptions.lowTier.subscribers')}
              />
              {getErrorMessage('paidSubscriptions.lowTier.subscribers') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('paidSubscriptions.lowTier.subscribers')}
                </p>
              )}
            </div>
          </div>

          {/* Mid Tier */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">Mid Tier</h4>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Cost</label>
              <input
                type="number"
                value={paidSubscriptions.midTier.cost}
                onChange={(e) => onPaidSubscriptionsChange({
                  ...paidSubscriptions,
                  midTier: { ...paidSubscriptions.midTier, cost: parseFloat(e.target.value) || 0 }
                })}
                className={getInputClassName('paidSubscriptions.midTier.cost')}
              />
              {getErrorMessage('paidSubscriptions.midTier.cost') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('paidSubscriptions.midTier.cost')}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Subscribers</label>
              <input
                type="number"
                value={paidSubscriptions.midTier.subscribers}
                onChange={(e) => onPaidSubscriptionsChange({
                  ...paidSubscriptions,
                  midTier: { ...paidSubscriptions.midTier, subscribers: parseFloat(e.target.value) || 0 }
                })}
                className={getInputClassName('paidSubscriptions.midTier.subscribers')}
              />
              {getErrorMessage('paidSubscriptions.midTier.subscribers') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('paidSubscriptions.midTier.subscribers')}
                </p>
              )}
            </div>
          </div>

          {/* High Tier */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">High Tier</h4>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Cost</label>
              <input
                type="number"
                value={paidSubscriptions.highTier.cost}
                onChange={(e) => onPaidSubscriptionsChange({
                  ...paidSubscriptions,
                  highTier: { ...paidSubscriptions.highTier, cost: parseFloat(e.target.value) || 0 }
                })}
                className={getInputClassName('paidSubscriptions.highTier.cost')}
              />
              {getErrorMessage('paidSubscriptions.highTier.cost') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('paidSubscriptions.highTier.cost')}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400">Subscribers</label>
              <input
                type="number"
                value={paidSubscriptions.highTier.subscribers}
                onChange={(e) => onPaidSubscriptionsChange({
                  ...paidSubscriptions,
                  highTier: { ...paidSubscriptions.highTier, subscribers: parseFloat(e.target.value) || 0 }
                })}
                className={getInputClassName('paidSubscriptions.highTier.subscribers')}
              />
              {getErrorMessage('paidSubscriptions.highTier.subscribers') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('paidSubscriptions.highTier.subscribers')}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Sponsorships Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Monthly Sponsorships</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Revenue from newsletter sponsors, starting at {sponsorships.minSubscribers.toLocaleString()} subscribers.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Low</label>
            <input
              type="number"
              value={sponsorships.low}
              onChange={(e) => onSponsorshipsChange({ ...sponsorships, low: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('sponsorships.low')}
            />
            {getErrorMessage('sponsorships.low') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('sponsorships.low')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mid</label>
            <input
              type="number"
              value={sponsorships.mid}
              onChange={(e) => onSponsorshipsChange({ ...sponsorships, mid: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('sponsorships.mid')}
            />
            {getErrorMessage('sponsorships.mid') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('sponsorships.mid')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">High</label>
            <input
              type="number"
              value={sponsorships.high}
              onChange={(e) => onSponsorshipsChange({ ...sponsorships, high: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('sponsorships.high')}
            />
            {getErrorMessage('sponsorships.high') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('sponsorships.high')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Flywheel</label>
            <input
              type="number"
              value={sponsorships.flywheel}
              onChange={(e) => onSponsorshipsChange({ ...sponsorships, flywheel: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('sponsorships.flywheel')}
            />
            {getErrorMessage('sponsorships.flywheel') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('sponsorships.flywheel')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* High Ticket Offering Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">High Ticket Offering</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price</label>
            <input
              type="number"
              value={highTicketOffering.price}
              onChange={(e) => onHighTicketChange({ ...highTicketOffering, price: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('highTicketOffering.price')}
            />
            {getErrorMessage('highTicketOffering.price') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('highTicketOffering.price')}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subscribers to Convert</label>
            <input
              type="number"
              value={highTicketOffering.subscribersToConvert}
              onChange={(e) => onHighTicketChange({ ...highTicketOffering, subscribersToConvert: parseFloat(e.target.value) || 0 })}
              className={getInputClassName('highTicketOffering.subscribersToConvert')}
            />
            {getErrorMessage('highTicketOffering.subscribersToConvert') && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {getErrorMessage('highTicketOffering.subscribersToConvert')}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Affiliate Sales Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Affiliate Sales</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sale Price</label>
              <input
                type="number"
                value={affiliateSales.salePrice}
                onChange={(e) => onAffiliateSalesChange({ ...affiliateSales, salePrice: parseFloat(e.target.value) || 0 })}
                className={getInputClassName('affiliateSales.salePrice')}
              />
              {getErrorMessage('affiliateSales.salePrice') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('affiliateSales.salePrice')}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Commission Rate (%)</label>
              <input
                type="number"
                value={affiliateSales.commissionRate * 100}
                onChange={(e) => onAffiliateSalesChange({ ...affiliateSales, commissionRate: (parseFloat(e.target.value) || 0) / 100 })}
                className={getInputClassName('affiliateSales.commissionRate')}
              />
              {getErrorMessage('affiliateSales.commissionRate') && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {getErrorMessage('affiliateSales.commissionRate')}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Conversion Rates (%)</label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400">Low</label>
                  <input
                    type="number"
                    value={affiliateSales.conversionRates.low * 100}
                    onChange={(e) => onAffiliateSalesChange({
                      ...affiliateSales,
                      conversionRates: {
                        ...affiliateSales.conversionRates,
                        low: (parseFloat(e.target.value) || 0) / 100
                      }
                    })}
                    className={getInputClassName('affiliateSales.conversionRates.low')}
                  />
                  {getErrorMessage('affiliateSales.conversionRates.low') && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {getErrorMessage('affiliateSales.conversionRates.low')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400">Mid</label>
                  <input
                    type="number"
                    value={affiliateSales.conversionRates.mid * 100}
                    onChange={(e) => onAffiliateSalesChange({
                      ...affiliateSales,
                      conversionRates: {
                        ...affiliateSales.conversionRates,
                        mid: (parseFloat(e.target.value) || 0) / 100
                      }
                    })}
                    className={getInputClassName('affiliateSales.conversionRates.mid')}
                  />
                  {getErrorMessage('affiliateSales.conversionRates.mid') && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {getErrorMessage('affiliateSales.conversionRates.mid')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400">High</label>
                  <input
                    type="number"
                    value={affiliateSales.conversionRates.high * 100}
                    onChange={(e) => onAffiliateSalesChange({
                      ...affiliateSales,
                      conversionRates: {
                        ...affiliateSales.conversionRates,
                        high: (parseFloat(e.target.value) || 0) / 100
                      }
                    })}
                    className={getInputClassName('affiliateSales.conversionRates.high')}
                  />
                  {getErrorMessage('affiliateSales.conversionRates.high') && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {getErrorMessage('affiliateSales.conversionRates.high')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 