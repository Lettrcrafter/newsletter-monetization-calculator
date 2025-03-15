import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { NMIQuestion } from '../../data/nmiQuestions';

interface QuestionCardProps {
  question: NMIQuestion;
  currentScore: number;
  onScore: (score: number) => void;
  onNext: () => void;
  onBack: () => void;
  progress: number;
  isLastQuestion: boolean;
}

export function QuestionCard({
  question,
  currentScore,
  onScore,
  onNext,
  onBack,
  progress,
  isLastQuestion
}: QuestionCardProps) {
  const scores = Array.from({ length: 11 }, (_, i) => i);

  return (
    <Card className="w-full max-w-2xl p-8 space-y-8">
      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {question.text}
        </h2>
        {question.description && (
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
            {question.description}
          </p>
        )}

        <div className="flex flex-col items-center space-y-6 mt-8">
          <div className="w-full grid grid-cols-11 gap-2">
            {scores.map((score) => (
              <Button
                key={score}
                onClick={() => onScore(score)}
                variant={currentScore === score ? 'default' : 'secondary'}
                className={`p-4 h-16 text-lg font-bold transition-all duration-200 ${
                  currentScore === score
                    ? 'scale-110 z-10'
                    : 'hover:scale-105'
                }`}
              >
                {score}
              </Button>
            ))}
          </div>
          
          <div className="w-full flex justify-between text-sm text-gray-500 dark:text-gray-400 px-2">
            <span>Not viable</span>
            <span>Highly viable</span>
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between pt-6">
        <Button onClick={onBack} variant="secondary">
          Back
        </Button>
        <Button onClick={onNext} disabled={currentScore === undefined}>
          {isLastQuestion ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Card>
  );
} 