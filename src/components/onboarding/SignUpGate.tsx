import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { theme } from '../../theme/colors';

interface SignUpGateProps {
  onComplete: () => void;
}

export function SignUpGate({ onComplete }: SignUpGateProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!formData.firstName || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete();
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div 
      className="w-full rounded-xl shadow-lg overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${theme.background} 0%, ${theme.successLight} 100%)`,
        border: `2px solid ${theme.primary}`,
      }}
    >
      <div className="p-8">
        <h2 
          className="text-3xl font-bold text-center mb-2" 
          style={{ 
            color: theme.text,
            textShadow: `0 2px 4px rgba(0,0,0,0.1)`
          }}
        >
          Create Your Account
        </h2>
        <p className="text-lg text-center mb-8" style={{ color: theme.secondary }}>
          Save your progress and get your detailed report
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{ 
                borderColor: theme.primary,
                '--tw-ring-color': theme.primary,
                '--tw-ring-opacity': 0.5,
                backgroundColor: 'rgba(255,255,255,0.9)'
              } as any}
              placeholder="John"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{ 
                borderColor: theme.primary,
                '--tw-ring-color': theme.primary,
                '--tw-ring-opacity': 0.5,
                backgroundColor: 'rgba(255,255,255,0.9)'
              } as any}
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: theme.text }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200"
              style={{ 
                borderColor: theme.primary,
                '--tw-ring-color': theme.primary,
                '--tw-ring-opacity': 0.5,
                backgroundColor: 'rgba(255,255,255,0.9)'
              } as any}
              placeholder="••••••••"
            />
            <p className="mt-1 text-sm" style={{ color: theme.secondary }}>Must be at least 8 characters</p>
          </div>

          {error && (
            <div 
              className="border px-4 py-3 rounded-lg"
              style={{
                backgroundColor: theme.errorLight,
                borderColor: theme.error,
                color: theme.error
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-4 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
              opacity: isLoading ? 0.8 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-sm text-center mt-4" style={{ color: theme.secondary }}>
            By creating an account, you agree to our{' '}
            <a 
              href="#" 
              style={{ color: theme.primary }} 
              className="font-medium hover:underline transition-colors duration-200"
            >
              Terms of Service
            </a>
            {' '}and{' '}
            <a 
              href="#" 
              style={{ color: theme.primary }} 
              className="font-medium hover:underline transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </p>
        </form>
      </div>
    </div>
  );
} 