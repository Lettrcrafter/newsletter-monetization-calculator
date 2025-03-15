import { Calculator, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ThemeToggle } from './ThemeToggle';

interface UserProfile {
  first_name: string | null;
  newsletter_name: string | null;
}

export function Header() {
  const { user, signOut } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (user) {
      supabase
        .from('profiles')
        .select('first_name, newsletter_name')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setUserProfile(data);
          }
        });
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="bg-white/50 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-800/50 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calculator className="w-8 h-8 text-green-600 dark:text-green-400" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Newsletter Monetization
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {userProfile && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{userProfile.first_name}</span>
                {userProfile.newsletter_name && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{userProfile.newsletter_name}</span>
                  </>
                )}
              </div>
            )}
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 