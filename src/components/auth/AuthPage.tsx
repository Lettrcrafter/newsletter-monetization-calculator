import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { ResetPasswordForm } from './ResetPasswordForm';

type AuthTab = 'signin' | 'signup' | 'reset';

export function AuthPage() {
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Newsletter Monetization Calculator
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account or create a new one
          </p>
        </div>

        <div className="mt-8">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setActiveTab('signin')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'signin'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'signup'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          {activeTab === 'signin' && (
            <div>
              <SignInForm />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab('reset')}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </button>
              </div>
            </div>
          )}

          {activeTab === 'signup' && <SignUpForm />}

          {activeTab === 'reset' && (
            <div>
              <ResetPasswordForm />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setActiveTab('signin')}
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Back to sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 