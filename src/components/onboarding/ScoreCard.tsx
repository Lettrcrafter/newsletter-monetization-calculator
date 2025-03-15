import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { theme } from '../../theme/colors';

interface ScoreCardProps {
  score: number;
  onComplete: () => void;
}

export function ScoreCard({ score, onComplete }: ScoreCardProps) {
  const maxScore = 200; // 20 questions × 10 points max
  const percentage = Math.round((score / maxScore) * 100);

  const getMessage = (percentage: number) => {
    if (percentage >= 80) {
      return "You're in a great position to monetize your newsletter!";
    } else if (percentage >= 60) {
      return "You have good potential for newsletter monetization.";
    } else {
      return "There's room for growth in your newsletter journey.";
    }
  };

  return (
    <div 
      className="w-full rounded-xl shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`,
        border: `2px solid ${theme.primary}`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="space-y-8 p-8 text-center"
      >
        <h2 
          className="text-3xl font-bold tracking-tight"
          style={{ 
            color: theme.text,
            textShadow: `0 2px 4px rgba(0,0,0,0.1)`
          }}
        >
          Your Newsletter Monetization Score
        </h2>
        
        <div className="relative w-48 h-48 mx-auto">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="none"
              r="45"
              cx="50"
              cy="50"
            />
            <circle
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
              r="45"
              cx="50"
              cy="50"
              strokeDasharray={`${percentage * 2.83}, 283`}
              transform="rotate(-90 50 50)"
              style={{ stroke: theme.primary }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-bold" style={{ color: theme.text }}>{percentage}%</span>
              <div style={{ color: theme.secondary }}>
                {score} / {maxScore} points
              </div>
            </div>
          </div>
        </div>

        <p className="text-lg" style={{ color: theme.secondary }}>
          {getMessage(percentage)}
        </p>

        <Button 
          onClick={onComplete} 
          size="lg" 
          className="transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          }}
        >
          Start Calculating
        </Button>
      </motion.div>
    </div>
  );
} 