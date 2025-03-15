import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
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
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { theme } from './theme/colors';

// Add CSS property definition for gradient angle
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @property --gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate {
    0% {
      --gradient-angle: 0deg;
    }
    100% {
      --gradient-angle: 360deg;
    }
  }

  .rotating-gradient {
    background: linear-gradient(var(--gradient-angle), ${theme.accentAlt}, ${theme.secondary});
    animation: rotate 8s linear infinite;
  }
`;
document.head.appendChild(styleSheet);

function App() {
  const { user, loading } = useAuth();
  const [showSignUp, setShowSignUp] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState('charts');
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

  const handleStateChange = (newState: Partial<CalculatorState>) => {
    setCalculatorState(prev => {
      const updated = { ...prev, ...newState };
      setValidationErrors(validateCalculatorState(updated));
      return updated;
    });
  };

  const calculateProjections = async () => {
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

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="rotating-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      <div className="relative">
        <Header />
        <main>
          {!user ? (
            <div className="max-w-md mx-auto p-6">
              <Card className="p-8">
                {showSignUp ? (
                  <>
                    <SignUpForm />
                    <p className="mt-4 text-center text-gray-600">
                      Already have an account?{' '}
                      <button
                        onClick={() => setShowSignUp(false)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Sign in
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <SignInForm />
                    <p className="mt-4 text-center text-gray-600">
                      Don't have an account?{' '}
                      <button
                        onClick={() => setShowSignUp(true)}
                        className="text-green-600 hover:text-green-700"
                      >
                        Sign up
                      </button>
                    </p>
                  </>
                )}
              </Card>
            </div>
          ) : showOnboarding ? (
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold" style={{ color: theme.text }}>
                    Newsletter Monetization
                  </h1>
                  <SavedStates
                    currentState={calculatorState}
                    onLoad={(state) => {
                      setCalculatorState(state);
                      setValidationErrors(validateCalculatorState(state));
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
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
                      />
                    </Card>
                    <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                      <StatsInput
                        stats={calculatorState.stats}
                        onChange={(stats) => handleStateChange({ stats })}
                      />
                    </Card>
                    <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                      <ExpensesInput
                        expenses={calculatorState.expenses}
                        onChange={(expenses) => handleStateChange({ expenses })}
                      />
                    </Card>

                    <button
                      onClick={calculateProjections}
                      disabled={isCalculating || validationErrors.length > 0}
                      className="w-full py-4 px-4 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
                      style={{ 
                        background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
                        opacity: isCalculating || validationErrors.length > 0 ? 0.8 : 1,
                        cursor: isCalculating || validationErrors.length > 0 ? 'not-allowed' : 'pointer'
                      }}
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
                      <h2 className="text-2xl font-bold" style={{ color: theme.text }}>
                        Monthly Projections
                      </h2>
                      <Tabs
                        tabs={[
                          { id: 'charts', label: 'Charts' },
                          { id: 'numbers', label: 'Month-by-Month Numbers' },
                        ]}
                        activeTab={activeTab}
                        onChange={setActiveTab}
                      />
                      {activeTab === 'charts' ? (
                        <div className="space-y-8">
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionChart
                              projections={calculatorState.projections.low}
                              title="Conservative"
                            />
                          </Card>
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionChart
                              projections={calculatorState.projections.mid}
                              title="Moderate"
                            />
                          </Card>
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionChart
                              projections={calculatorState.projections.high}
                              title="Aggressive"
                            />
                          </Card>
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionChart
                              projections={calculatorState.projections.flywheel}
                              title="Flywheel"
                            />
                          </Card>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionsDisplay
                              projections={calculatorState.projections.low}
                              title="Conservative Projections"
                            />
                          </Card>
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionsDisplay
                              projections={calculatorState.projections.mid}
                              title="Moderate Projections"
                            />
                          </Card>
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionsDisplay
                              projections={calculatorState.projections.high}
                              title="Aggressive Projections"
                            />
                          </Card>
                          <Card className="p-6" style={{ background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`, border: `2px solid ${theme.primary}` }}>
                            <ProjectionsDisplay
                              projections={calculatorState.projections.flywheel}
                              title="Flywheel Projections"
                            />
                          </Card>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;