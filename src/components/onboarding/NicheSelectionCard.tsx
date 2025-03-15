import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

const nicheGroups = [
  {
    id: 'lifestyle',
    label: 'General Interests & Lifestyle',
    niches: [
      { id: 'personal-dev', label: 'Personal Development & Self-Improvement', score: 7 },
      { id: 'finance-personal', label: 'Personal Finance', score: 8 },
      { id: 'travel', label: 'Travel', score: 6 },
      { id: 'fitness', label: 'Fitness & Wellness', score: 7 },
      { id: 'fashion', label: 'Fashion & Beauty', score: 6 },
      { id: 'parenting', label: 'Parenting', score: 7 },
      { id: 'food', label: 'Food & Drink', score: 6 },
      { id: 'home', label: 'Home & Garden', score: 6 },
      { id: 'entertainment', label: 'Entertainment', score: 5 },
      { id: 'gaming', label: 'Gaming', score: 6 },
      { id: 'diy', label: 'DIY, Crafts, and Hobbies', score: 6 }
    ]
  },
  {
    id: 'business',
    label: 'Business & Technology',
    niches: [
      { id: 'business-entrepreneurship', label: 'Business & Entrepreneurship', score: 9 },
      { id: 'technology', label: 'Technology', score: 9 },
      { id: 'ecommerce', label: 'E-commerce', score: 8 },
      { id: 'finance-investing', label: 'Finance & Investing', score: 9 },
      { id: 'b2b', label: 'B2B Insights', score: 8 },
      { id: 'daily-analysis', label: 'Daily Analysis', score: 8 },
      { id: 'morning-brew', label: 'Morning Brew Style', score: 8 },
      { id: 'tldr', label: 'TLDR Tech & Startups', score: 8 }
    ]
  },
  {
    id: 'expertise',
    label: 'Niche Expertise & Curated Content',
    niches: [
      { id: 'industry', label: 'Specific Industry Knowledge', score: 9 },
      { id: 'skills', label: 'Unique Skills', score: 8 },
      { id: 'hobbies', label: 'Passionate Hobbies', score: 7 }
    ]
  }
];

interface NicheSelectionCardProps {
  onNext: (niche: string, score: number, label: string) => void;
  selectedNicheId?: string | null;
}

export function NicheSelectionCard({ onNext, selectedNicheId }: NicheSelectionCardProps) {
  const [selectedNiche, setSelectedNiche] = useState<{ id: string; label: string; score: number } | null>(null);

  const handleNicheSelect = (niche: { id: string; label: string; score: number }) => {
    setSelectedNiche(niche);
    onNext(niche.id, niche.score, niche.label);
  };

  // Find the selected niche from the selectedNicheId prop
  const selectedNicheFromId = selectedNicheId ? 
    nicheGroups.flatMap(group => group.niches).find(niche => niche.id === selectedNicheId) : 
    null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 p-8"
    >
      {(selectedNiche || selectedNicheFromId) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4 text-center"
        >
          <p className="text-green-800 font-medium">
            Your niche is <span className="font-bold">{(selectedNiche || selectedNicheFromId)?.label}</span>
          </p>
        </motion.div>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-center">Select Your Newsletter Niche</h2>
      <p className="text-gray-600 text-center">
        Choose the category that best describes your newsletter's focus
      </p>
      <div className="space-y-8">
        {nicheGroups.map((group) => (
          <div key={group.id} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">{group.label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.niches.map((niche) => (
                <motion.button
                  key={niche.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNicheSelect(niche)}
                  className={`p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-200 text-left ${
                    (selectedNiche?.id === niche.id || selectedNicheId === niche.id) ? 'ring-2 ring-green-500' : ''
                  }`}
                >
                  <h4 className="font-medium">{niche.label}</h4>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
} 