import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeCard } from './WelcomeCard';
import { NicheSelectionCard } from './NicheSelectionCard';
import { QuestionCard } from './QuestionCard';
import { ScoreCard } from './ScoreCard';
import { nmiQuestions } from '../../data/nmiQuestions';
import { theme } from '../../theme/colors';

export type OnboardingStep = 'welcome' | 'niche' | 'questions' | 'score';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<OnboardingStep>('welcome');
  const [nicheScore, setNicheScore] = useState(0);
  const [selectedNicheId, setSelectedNicheId] = useState<string | null>(null);
  const [selectedNicheLabel, setSelectedNicheLabel] = useState<string | null>(null);
  const [questionScores, setQuestionScores] = useState<number[]>(Array(nmiQuestions.length).fill(0));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNicheSelect = (niche: string, score: number, label: string) => {
    setSelectedNicheId(niche);
    setSelectedNicheLabel(label);
    setNicheScore(score * 10); // Scale niche score to be out of 100
    // Add a delay before transitioning to questions
    setTimeout(() => {
      setStep('questions');
    }, 1500); // 1.5 second delay
  };

  const handleAnswer = (score: number) => {
    const newScores = [...questionScores];
    newScores[currentQuestionIndex] = score;
    setQuestionScores(newScores);

    if (currentQuestionIndex < nmiQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStep('score'); // Go directly to score after last question
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setStep('niche');
    }
  };

  const getTotalScore = () => {
    const questionsTotal = questionScores.reduce((sum, score) => sum + score, 0);
    return questionsTotal + nicheScore;
  };

  const renderSelectedNicheBanner = () => {
    if (!selectedNicheLabel || step === 'welcome' || step === 'niche') return null;
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg p-6 text-center mb-8"
        style={{
          background: `linear-gradient(135deg, ${theme.successLight} 0%, ${theme.background} 100%)`,
          border: `2px solid ${theme.primary}`,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <p style={{ color: theme.text }} className="text-lg font-medium">
          Your niche is{' '}
          <span 
            className="font-bold"
            style={{ 
              color: theme.primary,
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}
          >
            {selectedNicheLabel}
          </span>
        </p>
      </motion.div>
    );
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 animate-gradient"
      style={{
        background: `linear-gradient(var(--gradient-angle), ${theme.accentAlt} 0%, ${theme.secondary} 100%)`,
        animation: 'gradient-rotation 8s linear infinite',
        '--gradient-angle': '0deg'
      } as any}
    >
      <style>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes gradient-rotation {
          0% {
            --gradient-angle: 0deg;
          }
          100% {
            --gradient-angle: 360deg;
          }
        }
      `}</style>
      <div className="w-full max-w-2xl">
        {renderSelectedNicheBanner()}
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <WelcomeCard onNext={() => setStep('niche')} />
            </motion.div>
          )}

          {step === 'niche' && (
            <motion.div
              key="niche"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <NicheSelectionCard 
                onNext={handleNicheSelect} 
                selectedNicheId={selectedNicheId}
              />
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <QuestionCard
                question={nmiQuestions[currentQuestionIndex]}
                currentScore={questionScores[currentQuestionIndex]}
                onScore={handleAnswer}
                onNext={() => handleAnswer(questionScores[currentQuestionIndex])}
                onBack={handleBack}
                progress={(currentQuestionIndex + 1) / nmiQuestions.length}
                isLastQuestion={currentQuestionIndex === nmiQuestions.length - 1}
              />
            </motion.div>
          )}

          {step === 'score' && (
            <motion.div
              key="score"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <ScoreCard score={getTotalScore()} onComplete={onComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 