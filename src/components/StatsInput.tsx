import React from 'react';
import { NewsletterStats } from '../types/calculator';
import { ValidationError } from '../lib/validation';

interface StatsInputProps {
  stats: NewsletterStats;
  onChange: (stats: NewsletterStats) => void;
  errors?: ValidationError[];
}

export function StatsInput({ stats, onChange, errors = [] }: StatsInputProps) {
  const getErrorMessage = (field: string) => {
    const error = errors.find(e => e.field === `stats.${field}`);
    return error?.message;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Newsletter Stats</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Existing Subscribers
          </label>
          <input
            type="number"
            value={stats.existingSubscribers}
            onChange={(e) => onChange({ ...stats, existingSubscribers: parseFloat(e.target.value) || 0 })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('existingSubscribers') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('existingSubscribers') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('existingSubscribers')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Open Rate (%)
          </label>
          <input
            type="number"
            value={stats.openRate * 100}
            onChange={(e) => onChange({ ...stats, openRate: (parseFloat(e.target.value) || 0) / 100 })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('openRate') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('openRate') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('openRate')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Click Rate (%)
          </label>
          <input
            type="number"
            value={stats.clickRate * 100}
            onChange={(e) => onChange({ ...stats, clickRate: (parseFloat(e.target.value) || 0) / 100 })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('clickRate') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('clickRate') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('clickRate')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Monthly SEO Subscribers
          </label>
          <input
            type="number"
            value={stats.subscribersFromSEO}
            onChange={(e) => onChange({ ...stats, subscribersFromSEO: parseFloat(e.target.value) || 0 })}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('subscribersFromSEO') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('subscribersFromSEO') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('subscribersFromSEO')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}