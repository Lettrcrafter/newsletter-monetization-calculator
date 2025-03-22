import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../theme/colors';

interface Question {
  title: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
  explanation: string;
}

const questions: Question[] = [
  {
    title: "Access to Free Subscribers (Partnerships)",
    question: "Do you have existing partnerships or networks that can provide free subscribers to your newsletter?",
    options: [
      { text: "I have strong partnerships that can provide many free subscribers.", score: 10 },
      { text: "I have some partnerships that might provide a few free subscribers.", score: 7 },
      { text: "I have limited partnerships, unlikely to provide many free subscribers.", score: 4 },
      { text: "I have no partnerships for free subscribers.", score: 1 }
    ],
    explanation: "Partnerships can lower your customer acquisition costs by providing free subscribers, making growth more cost-effective."
  },
  {
    title: "Access to Public or Cheap Lists",
    question: "Are there publicly available or inexpensive email lists relevant to your niche that you can use to grow your newsletter?",
    options: [
      { text: "Yes, there are many high-quality lists available.", score: 10 },
      { text: "There are some lists, but they might not be very targeted.", score: 7 },
      { text: "Lists are available but expensive or of low quality.", score: 4 },
      { text: "No, there are no such lists available.", score: 1 }
    ],
    explanation: "Access to affordable, relevant email lists can accelerate subscriber growth with minimal upfront investment."
  },
  {
    title: "Organic Referral Potential",
    question: "How likely are your subscribers to share your newsletter with others?",
    options: [
      { text: "Very likely, my content is highly shareable.", score: 10 },
      { text: "Somewhat likely, some subscribers might share.", score: 7 },
      { text: "Not very likely, sharing is uncommon in my niche.", score: 4 },
      { text: "Unlikely, my content isn't typically shared.", score: 1 }
    ],
    explanation: "High referral potential allows your newsletter to grow organically, reducing reliance on paid marketing."
  },
  {
    title: "Industry Ad Spend",
    question: "How much do companies in your niche typically spend on advertising?",
    options: [
      { text: "A lot, advertising is a major expense in this industry.", score: 10 },
      { text: "A moderate amount, advertising is important but not excessive.", score: 7 },
      { text: "Not much, advertising is not a priority in this niche.", score: 4 },
      { text: "Very little, advertising is rare in this industry.", score: 1 }
    ],
    explanation: "High ad spend signals that companies are willing to pay for exposure, boosting your potential ad or sponsorship revenue."
  },
  {
    title: "High LTV Audience",
    question: "How valuable is your audience to potential advertisers or sponsors? (Consider factors like purchasing power, engagement, etc.)",
    options: [
      { text: "Extremely valuable, high purchasing power and engagement.", score: 10 },
      { text: "Valuable, moderate purchasing power and engagement.", score: 7 },
      { text: "Somewhat valuable, lower purchasing power or engagement.", score: 4 },
      { text: "Not very valuable, low purchasing power and engagement.", score: 1 }
    ],
    explanation: "A high Lifetime Value (LTV) audience attracts advertisers, enabling you to charge premium rates."
  },
  {
    title: "Paid Subscription Viability",
    question: "How likely are your subscribers to pay for premium content or a subscription?",
    options: [
      { text: "Very likely, there's a strong demand for paid content.", score: 10 },
      { text: "Likely, some subscribers might be willing to pay.", score: 7 },
      { text: "Unlikely, most prefer free content.", score: 4 },
      { text: "Very unlikely, paid subscriptions are not common in this niche.", score: 1 }
    ],
    explanation: "A willingness to pay supports direct revenue through subscriptions, offering stability over ad-based models."
  },
  {
    title: "Affiliate & Sponsorship Potential",
    question: "How easy is it to find affiliate programs or sponsors relevant to your niche?",
    options: [
      { text: "Very easy, many options available.", score: 10 },
      { text: "Easy, some good options exist.", score: 7 },
      { text: "Difficult, limited options.", score: 4 },
      { text: "Very difficult, almost no options.", score: 1 }
    ],
    explanation: "Robust affiliate and sponsorship opportunities provide additional revenue streams through commissions or paid content."
  },
  {
    title: "Ease of Targeting Subs (Paid Ads)",
    question: "How easy is it to target your ideal subscribers through paid advertising platforms (e.g., Facebook Ads, Google Ads)?",
    options: [
      { text: "Very easy, precise targeting options available.", score: 10 },
      { text: "Easy, decent targeting options.", score: 7 },
      { text: "Difficult, targeting options are limited.", score: 4 },
      { text: "Very difficult, almost impossible to target effectively.", score: 1 }
    ],
    explanation: "Effective targeting minimizes ad spend waste, making paid growth more efficient."
  },
  {
    title: "Low-Cost Growth Hacks",
    question: "Are there creative, low-cost strategies you can use to grow your newsletter (e.g., viral loops, referral programs)?",
    options: [
      { text: "Yes, many effective hacks available.", score: 10 },
      { text: "Some hacks might work.", score: 7 },
      { text: "Few hacks are applicable.", score: 4 },
      { text: "No, growth requires significant investment.", score: 1 }
    ],
    explanation: "Low-cost growth hacks enable rapid scaling without a hefty marketing budget."
  },
  {
    title: "Cold Email Viability",
    question: "How effective is cold emailing for acquiring subscribers in your niche?",
    options: [
      { text: "Very effective, high response rates.", score: 10 },
      { text: "Effective, decent response rates.", score: 7 },
      { text: "Not very effective, low response rates.", score: 4 },
      { text: "Ineffective, almost no responses.", score: 1 }
    ],
    explanation: "Cold emailing can be a powerful subscriber acquisition tool if your niche responds well."
  },
  {
    title: "Market Gap & Opportunity",
    question: "Is there a significant gap in the market that your newsletter can fill?",
    options: [
      { text: "Yes, there's a clear unmet need.", score: 10 },
      { text: "Possibly, there's some opportunity.", score: 7 },
      { text: "Not really, the market is saturated.", score: 4 },
      { text: "No, the market is oversaturated.", score: 1 }
    ],
    explanation: "Filling a market gap helps your newsletter stand out and attract subscribers."
  },
  {
    title: "Trend & Industry Growth",
    question: "Is your niche part of a growing trend or industry?",
    options: [
      { text: "Yes, it's rapidly growing.", score: 10 },
      { text: "It's growing moderately.", score: 7 },
      { text: "It's stable, not growing much.", score: 4 },
      { text: "It's declining.", score: 1 }
    ],
    explanation: "A growing industry provides momentum for your newsletter's expansion."
  },
  {
    title: "Ease of Content Sourcing",
    question: "How easy is it to find or create content for your newsletter?",
    options: [
      { text: "Very easy, abundant sources available.", score: 10 },
      { text: "Easy, some effort required.", score: 7 },
      { text: "Difficult, content is hard to source.", score: 4 },
      { text: "Very difficult, content creation is challenging.", score: 1 }
    ],
    explanation: "Easy content sourcing lowers costs and ensures consistent output."
  },
  {
    title: "In-House Product Potential",
    question: "Can you create and sell your own products or services to your audience?",
    options: [
      { text: "Yes, many opportunities for in-house products.", score: 10 },
      { text: "Some opportunities exist.", score: 7 },
      { text: "Limited opportunities.", score: 4 },
      { text: "No, not feasible.", score: 1 }
    ],
    explanation: "In-house products offer high-margin revenue directly from your audience."
  },
  {
    title: "Automation & AI Potential",
    question: "Can automation or AI tools help streamline your newsletter operations?",
    options: [
      { text: "Yes, significant automation possible.", score: 10 },
      { text: "Some automation is possible.", score: 7 },
      { text: "Limited automation opportunities.", score: 4 },
      { text: "No, operations require manual effort.", score: 1 }
    ],
    explanation: "Automation reduces costs and boosts efficiency, enhancing profitability."
  },
  {
    title: "Growth Speed to 100k",
    question: "Realistically, how quickly do you think you can grow your newsletter to 100,000 subscribers?",
    options: [
      { text: "Very quickly, within a year.", score: 10 },
      { text: "Fairly quickly, within 2-3 years.", score: 7 },
      { text: "It will take time, 3-5 years.", score: 4 },
      { text: "It will be very slow, more than 5 years.", score: 1 }
    ],
    explanation: "Faster growth accelerates monetization and scale."
  },
  {
    title: "Cost Recovery Speed",
    question: "How soon do you expect to recoup the costs of acquiring new subscribers?",
    options: [
      { text: "Very quickly, within a few months.", score: 10 },
      { text: "Within a year.", score: 7 },
      { text: "It will take 1-2 years.", score: 4 },
      { text: "It will take more than 2 years.", score: 1 }
    ],
    explanation: "Quick cost recovery improves cash flow and sustainability."
  },
  {
    title: "Potential Audience Size",
    question: "How large is the total potential audience for your newsletter?",
    options: [
      { text: "Very large, millions of people.", score: 10 },
      { text: "Large, hundreds of thousands.", score: 7 },
      { text: "Moderate, tens of thousands.", score: 4 },
      { text: "Small, thousands or less.", score: 1 }
    ],
    explanation: "A larger potential audience provides more room for growth and monetization."
  },
  {
    title: "Competition Level",
    question: "How competitive is your newsletter niche?",
    options: [
      { text: "Low competition, few established players.", score: 10 },
      { text: "Moderate competition, some established players.", score: 7 },
      { text: "High competition, many established players.", score: 4 },
      { text: "Extremely competitive, saturated market.", score: 1 }
    ],
    explanation: "Lower competition makes it easier to establish your position and grow."
  },
  {
    title: "Content Differentiation",
    question: "How easily can you differentiate your content from existing newsletters in your niche?",
    options: [
      { text: "Very easily, unique perspective or approach.", score: 10 },
      { text: "Easily, some unique elements.", score: 7 },
      { text: "With difficulty, similar to others.", score: 4 },
      { text: "Very difficult, no clear differentiation.", score: 1 }
    ],
    explanation: "Strong differentiation helps you stand out and attract loyal subscribers."
  }
];

interface MonetizationQuizProps {
  onComplete: (score: number) => void;
}

export const MonetizationQuiz: React.FC<MonetizationQuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    setShowExplanation(true);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setShowExplanation(false);
      }, 3000);
    } else {
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      setTimeout(() => onComplete(totalScore), 3000);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold" style={{ color: theme.text }}>{currentQ.title}</h3>
            <span className="text-sm" style={{ color: theme.secondary }}>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full rounded-full h-2" style={{ backgroundColor: theme.background }}>
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                backgroundColor: theme.success
              }}
            />
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6" style={{ color: theme.text }}>{currentQ.question}</h2>

        <div className="space-y-4">
          {currentQ.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(option.score)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                showExplanation
                  ? option.score === currentQ.options[answers[currentQuestion]]?.score
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-gray-50'
                  : 'border-gray-200 hover:border-green-500 hover:bg-green-50'
              }`}
            >
              <span className="block" style={{ color: theme.text }}>{option.text}</span>
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 rounded-lg"
            style={{ 
              backgroundColor: theme.successLight,
              border: `1px solid ${theme.success}`
            }}
          >
            <p style={{ color: theme.text }}>{currentQ.explanation}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}; 