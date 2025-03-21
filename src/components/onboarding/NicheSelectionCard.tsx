import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../theme/colors';

interface NicheSelectionCardProps {
  onSelect: (niche: string) => void;
}

export const NicheSelectionCard: React.FC<NicheSelectionCardProps> = ({ onSelect }) => {
  const niches = [
    { id: 'tech', label: 'Technology', score: 9 },
    { id: 'business', label: 'Business & Finance', score: 8 },
    { id: 'health', label: 'Health & Wellness', score: 7 },
    { id: 'lifestyle', label: 'Lifestyle', score: 6 },
    { id: 'education', label: 'Education', score: 7 },
    { id: 'entertainment', label: 'Entertainment', score: 5 },
    { id: 'sports', label: 'Sports', score: 6 },
    { id: 'food', label: 'Food & Cooking', score: 6 },
    { id: 'travel', label: 'Travel', score: 5 },
    { id: 'fashion', label: 'Fashion & Beauty', score: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Your Niche</h2>
        <p className="text-gray-600 mb-6">
          Choose the category that best describes your newsletter's focus. This will help us provide more relevant insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {niches.map((niche) => (
            <motion.button
              key={niche.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(niche.label)}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800">{niche.label}</h3>
              <p className="text-sm text-gray-500 mt-1">Base Score: {niche.score}/10</p>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 