import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './components/ui/theme-provider';
import { NavMenu } from './components/ui/nav-menu';
import { Card } from './components/ui/card';
import { Spinner } from './components/ui/spinner';
import { Tooltip } from './components/ui/tooltip';
import { SignUpForm } from './components/auth/SignUpForm';
import { SignInForm } from './components/auth/SignInForm';
import { Header } from './components/Header';
import { StatsInput } from './components/StatsInput';
import { RevenueSourcesInput } from './components/RevenueSourcesInput';
import { ExpensesInput } from './components/ExpensesInput';
import { ProjectionsDisplay } from './components/ProjectionsDisplay';
import { SavedStates } from './components/SavedStates';
import { CalculatorState, NewsletterStats, UpscribeRevenue, PaidSubscriptions, MonthlySponsorship, HighTicketOffering, AffiliateSales, MonthlyExpenses, ProjectionSet } from './types/calculator';
import { calculateProjections as calculateProjectionsUtil } from './lib/calculator';
import { validateCalculatorState, ValidationError } from './lib/validation';
import { ProjectionChart } from './components/ProjectionChart';
import { Tabs } from './components/ui/tabs';
import bgImage from './assets/dark-royal-green-gradient-seamless-pattern-vector-52062964.jpg';

function CalculatorApp() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    stats: {
      existingSubscribers: 1000,
      openRate: 0.5,
      clickRate: 0.02,
      subscribersFromSEO: 10
    },
    upscribe: {
      lowVariable: 1,
      midVariable: 2,
      highVariable: 3
    },
    paidSubscriptions: {
      lowTier: { cost: 10, subscribers: 7, value: 70 },
      midTier: { cost: 25, subscribers: 2, value: 50 },
      highTier: { cost: 100, subscribers: 1, value: 100 },
      revenuePerSub: 2.20
    },
    sponsorships: {
      low: 2000,
      mid: 4000,
      high: 12000,
      flywheel: 40000,
      minSubscribers: 10000
    },
    highTicketOffering: {
      price: 2000,
      conversionRate: 0.001,
      subscribersToConvert: 1000,
      valuePerSubscriber: 2
    },
    affiliateSales: {
      openRate: 0.5,
      clickThroughRate: 0.02,
      conversionRates: {
        low: 0.025,
        mid: 0.03,
        high: 0.05
      },
      salePrice: 8000,
      commissionRate: 0.3,
      revenuePerSale: 2400
    },
    adCosts: {
      low: 3.50,
      mid: 3.00,
      high: 2.50
    },
    expenses: {
      contentAndESP: 3000,
      seo: 1000,
      adManagement: 1000,
      total: 5000,
      adSpendBudget: 5000
    },
    projections: {
      low: { type: 'low', months: [] },
      mid: { type: 'mid', months: [] },
      high: { type: 'high', months: [] },
      flywheel: { type: 'flywheel', months: [] }
    }
  });

  const calculateProjections = async () => {
    // Validate state before calculating
    const errors = validateCalculatorState(calculatorState);
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      return;
    }

    setIsCalculating(true);
    try {
      const projections = calculateProjectionsUtil(calculatorState);
      setCalculatorState(prev => ({
        ...prev,
        projections
      }));
    } finally {
      setIsCalculating(false);
    }
  };

  const handleStateChange = (newState: Partial<CalculatorState>) => {
    setCalculatorState(prev => {
      const updated = { ...prev, ...newState };
      setValidationErrors(validateCalculatorState(updated));
      return updated;
    });
  };

  const getErrorsForField = (field: string) => {
    return validationErrors.filter(error => error.field === field);
  };

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Newsletter Monetization Calculator
            </h1>
            <SavedStates
              currentState={calculatorState}
              onLoad={(state) => {
                setCalculatorState(state);
                setValidationErrors(validateCalculatorState(state));
              }}
            />
          </div>

          <StatsInput
            stats={calculatorState.stats}
            onChange={(stats) => handleStateChange({ stats })}
            errors={validationErrors.filter(error => error.field.startsWith('stats.'))}
          />

          <RevenueSourcesInput
            upscribe={calculatorState.upscribe}
            paidSubscriptions={calculatorState.paidSubscriptions}
            sponsorships={calculatorState.sponsorships}
            highTicketOffering={calculatorState.highTicketOffering}
            affiliateSales={calculatorState.affiliateSales}
            onUpscribeChange={(upscribe) => handleStateChange({ upscribe })}
            onPaidSubscriptionsChange={(paidSubscriptions) => handleStateChange({ paidSubscriptions })}
            onSponsorshipsChange={(sponsorships) => handleStateChange({ sponsorships })}
            onHighTicketChange={(highTicketOffering) => handleStateChange({ highTicketOffering })}
            onAffiliateSalesChange={(affiliateSales) => handleStateChange({ affiliateSales })}
            errors={validationErrors.filter(error => 
              error.field.startsWith('upscribe.') ||
              error.field.startsWith('paidSubscriptions.') ||
              error.field.startsWith('sponsorships.') ||
              error.field.startsWith('highTicketOffering.') ||
              error.field.startsWith('affiliateSales.')
            )}
          />

          <ExpensesInput
            expenses={calculatorState.expenses}
            onChange={(expenses) => handleStateChange({ expenses })}
            errors={validationErrors.filter(error => error.field.startsWith('expenses.'))}
          />

          <div className="flex justify-center">
            <button
              onClick={calculateProjections}
              disabled={isCalculating || validationErrors.length > 0}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 flex items-center gap-2"
            >
              {isCalculating ? (
                <>
                  <Spinner className="w-5 h-5" />
                  Calculating...
                </>
              ) : validationErrors.length > 0 ? (
                'Fix validation errors to continue'
              ) : (
                'Calculate Projections'
              )}
            </button>
          </div>

          {calculatorState.projections && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Monthly Projections
              </h2>
              <Tabs
                tabs={[
                  {
                    id: 'charts',
                    label: 'Charts',
                    content: (
                      <div className="space-y-8">
                        <ProjectionChart
                          projections={calculatorState.projections.low}
                          title="Conservative"
                        />
                        <ProjectionChart
                          projections={calculatorState.projections.mid}
                          title="Moderate"
                        />
                        <ProjectionChart
                          projections={calculatorState.projections.high}
                          title="Aggressive"
                        />
                        <ProjectionChart
                          projections={calculatorState.projections.flywheel}
                          title="Flywheel"
                        />
                      </div>
                    ),
                  },
                  {
                    id: 'details',
                    label: 'Monthly Details',
                    content: (
                      <div className="space-y-8">
                        <ProjectionsDisplay
                          projections={calculatorState.projections.low}
                          title="Conservative Projections"
                        />
                        <ProjectionsDisplay
                          projections={calculatorState.projections.mid}
                          title="Moderate Projections"
                        />
                        <ProjectionsDisplay
                          projections={calculatorState.projections.high}
                          title="Aggressive Projections"
                        />
                        <ProjectionsDisplay
                          projections={calculatorState.projections.flywheel}
                          title="Flywheel Projections"
                        />
                      </div>
                    ),
                  },
                ]}
                defaultTab="charts"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AuthForm() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg backdrop-blur-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Newsletter Monetization Calculator
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {showSignUp ? 'Create an account to get started' : 'Sign in to your account'}
          </p>
        </div>

        {showSignUp ? <SignUpForm /> : <SignInForm />}

        <div className="text-center">
          <button
            onClick={() => setShowSignUp(!showSignUp)}
            className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
          >
            {showSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div 
        className="min-h-screen relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat'
        }}
      >
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/70 backdrop-blur-[1px]" />
        <div className="relative">
          {user ? (
            <>
              <Header />
              <CalculatorApp />
            </>
          ) : (
            <AuthForm />
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}