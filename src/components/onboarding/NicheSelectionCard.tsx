import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../theme/colors';

interface NicheSelectionCardProps {
  onSelect: (niche: string) => void;
}

export const NicheSelectionCard: React.FC<NicheSelectionCardProps> = ({ onSelect }) => {
  const niches = [
    { id: 'tech', label: 'Technology' },
    { id: 'business', label: 'Business & Finance' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'education', label: 'Education' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'sports', label: 'Sports' },
    { id: 'food', label: 'Food & Cooking' },
    { id: 'travel', label: 'Travel' },
    { id: 'fashion', label: 'Fashion & Beauty' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.text }}>Select Your Niche</h2>
        <p className="mb-6" style={{ color: theme.secondary }}>
          Choose the category that best describes your newsletter's focus. This will help us provide more relevant insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {niches.map((niche) => (
            <motion.button
              key={niche.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(niche.label)}
              className="p-4 rounded-lg border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold" style={{ color: theme.text }}>{niche.label}</h3>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}; 