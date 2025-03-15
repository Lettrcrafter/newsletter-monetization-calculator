import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { theme } from '../../theme/colors';

interface WelcomeCardProps {
  onNext: () => void;
}

export function WelcomeCard({ onNext }: WelcomeCardProps) {
  return (
    <div 
      className="w-full rounded-xl shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`,
        border: `2px solid ${theme.primary}`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="flex flex-col items-center justify-center space-y-6 text-center p-8"
      >
        <h2 
          className="text-3xl font-bold tracking-tight"
          style={{ 
            color: theme.text,
            textShadow: `0 2px 4px rgba(0,0,0,0.1)`
          }}
        >
          Welcome to Newsletter Monetization
        </h2>
        <p className="text-lg" style={{ color: theme.secondary }}>
          Let's help you understand your newsletter's potential and create a personalized monetization strategy.
        </p>
        <Button 
          onClick={onNext} 
          size="lg"
          className="transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
          style={{ 
            background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
          }}
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
} 