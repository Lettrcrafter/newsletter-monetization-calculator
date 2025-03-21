import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeCard } from './WelcomeCard';
import { NicheSelectionCard } from './NicheSelectionCard';
import { ScoreCard } from './ScoreCard';
import { MonetizationQuiz } from './MonetizationQuiz';

type OnboardingStep = 'welcome' | 'niche' | 'questions' | 'score';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [selectedNiche, setSelectedNiche] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    setStep('questions');
  };

  const handleQuizComplete = (quizScore: number) => {
    setScore(quizScore);
    setStep('score');
  };

  const handleScoreComplete = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-saffron to-moonstone">
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeCard onNext={() => setStep('niche')} />
          </motion.div>
        )}

        {step === 'niche' && (
          <motion.div
            key="niche"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <NicheSelectionCard onSelect={handleNicheSelect} />
          </motion.div>
        )}

        {step === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MonetizationQuiz onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {step === 'score' && score !== null && (
          <motion.div
            key="score"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ScoreCard score={score} onComplete={handleScoreComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 