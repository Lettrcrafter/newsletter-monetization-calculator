import { MonthlyExpenses } from '../types/calculator';
import { ValidationError } from '../lib/validation';

interface ExpensesInputProps {
  expenses: MonthlyExpenses;
  onChange: (expenses: MonthlyExpenses) => void;
  errors?: ValidationError[];
}

export function ExpensesInput({ expenses, onChange, errors = [] }: ExpensesInputProps) {
  const handleChange = (field: keyof MonthlyExpenses, value: number) => {
    onChange({
      ...expenses,
      [field]: value,
      total: field === 'total' ? value : expenses.contentAndESP + expenses.seo + expenses.adManagement
    });
  };

  const getErrorMessage = (field: string) => {
    const error = errors.find(e => e.field === `expenses.${field}`);
    return error?.message;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Monthly Expenses</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content + ESP Management
          </label>
          <input
            type="number"
            value={expenses.contentAndESP}
            onChange={(e) => handleChange('contentAndESP', parseFloat(e.target.value) || 0)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('contentAndESP') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('contentAndESP') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('contentAndESP')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            SEO
          </label>
          <input
            type="number"
            value={expenses.seo}
            onChange={(e) => handleChange('seo', parseFloat(e.target.value) || 0)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('seo') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('seo') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('seo')}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ad Management
          </label>
          <input
            type="number"
            value={expenses.adManagement}
            onChange={(e) => handleChange('adManagement', parseFloat(e.target.value) || 0)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('adManagement') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('adManagement') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('adManagement')}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Monthly Expenses
          </label>
          <div className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
            ${expenses.total.toLocaleString()}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ad Spend Budget Per Month
          </label>
          <input
            type="number"
            value={expenses.adSpendBudget}
            onChange={(e) => handleChange('adSpendBudget', parseFloat(e.target.value) || 0)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 ${
              getErrorMessage('adSpendBudget') 
                ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/50' 
                : 'border-gray-300 dark:border-gray-700 dark:bg-gray-900'
            } dark:text-white`}
          />
          {getErrorMessage('adSpendBudget') && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {getErrorMessage('adSpendBudget')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 