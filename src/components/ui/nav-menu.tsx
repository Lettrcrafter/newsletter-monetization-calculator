import { Home, History, Settings, Sun, Moon, Menu } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from './theme-provider';
import { cn } from '../../lib/utils';

interface NavMenuProps {
  className?: string;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export function NavMenu({ className, onNavigate, currentPath }: NavMenuProps) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: History, label: 'History', path: '/history' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className={cn('relative', className)}>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Navigation items */}
      <nav
        className={cn(
          'flex md:flex-row flex-col',
          'md:space-x-4 space-y-2 md:space-y-0',
          'md:relative absolute left-0 right-0',
          'md:bg-transparent bg-white dark:bg-gray-800',
          'md:shadow-none shadow-lg',
          'md:p-0 p-4',
          'md:mt-0 mt-2',
          'rounded-md',
          'z-50',
          isMenuOpen ? 'block' : 'hidden md:flex'
        )}
      >
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setIsMenuOpen(false);
              }}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md w-full',
                currentPath === item.path
                  ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
              )}
            >
              <Icon className="w-5 h-5 mr-2" />
              {item.label}
            </button>
          );
        })}

        {/* Theme toggle button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center md:justify-start w-full md:w-auto"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
          <span className="ml-2 md:hidden">Toggle Theme</span>
        </button>
      </nav>
    </div>
  );
} 