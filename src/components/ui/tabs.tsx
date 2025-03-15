import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TabsProps {
  tabs: {
    id: string;
    label: string;
  }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className="relative flex space-x-1 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-lg p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-md"
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
} 