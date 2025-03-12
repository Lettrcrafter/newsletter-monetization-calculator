import React from 'react';
import { NewsletterStats } from '../types/calculator';

interface StatsInputProps {
  stats: NewsletterStats;
  onChange: (stats: NewsletterStats) => void;
}

export function StatsInput({ stats, onChange }: StatsInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({
      ...stats,
      [name]: parseFloat(value) || 0
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Current Newsletter Stats</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Existing Subscribers
          </label>
          <input
            type="number"
            name="existingSubscribers"
            value={stats.existingSubscribers}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Open Rate (%)
          </label>
          <input
            type="number"
            name="openRate"
            value={stats.openRate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Click Rate (%)
          </label>
          <input
            type="number"
            name="clickRate"
            value={stats.clickRate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Monthly SEO Subscribers
          </label>
          <input
            type="number"
            name="subscribersFromSEO"
            value={stats.subscribersFromSEO}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </div>
  );
}