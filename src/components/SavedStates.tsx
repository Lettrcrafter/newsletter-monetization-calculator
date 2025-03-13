import { useState } from 'react';
import { SavedState, getSavedStates, saveCalculatorState, deleteSavedState } from '../lib/storage';
import { CalculatorState } from '../types/calculator';
import { Dialog } from './ui/dialog';
import { Button } from './ui/button';
import { Trash2, Save, Clock } from 'lucide-react';

interface SavedStatesProps {
  currentState: CalculatorState;
  onLoad: (state: CalculatorState) => void;
}

export function SavedStates({ currentState, onLoad }: SavedStatesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [savedStates, setSavedStates] = useState<SavedState[]>(getSavedStates());

  const handleSave = () => {
    if (!saveName.trim()) return;
    
    const newState = saveCalculatorState(saveName.trim(), currentState);
    setSavedStates([newState, ...savedStates.filter(s => s.id !== newState.id)]);
    setSaveName('');
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteSavedState(id);
    setSavedStates(savedStates.filter(s => s.id !== id));
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save/Load State
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Save/Load Calculator State
              </h2>

              <div className="space-y-4">
                {/* Save New State */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="Enter a name for this state"
                    className="flex-1 rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                  <Button
                    onClick={handleSave}
                    disabled={!saveName.trim()}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                  >
                    Save Current State
                  </Button>
                </div>

                {/* Saved States List */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Saved States
                  </h3>
                  
                  <div className="space-y-2">
                    {savedStates.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400">
                        No saved states yet
                      </p>
                    ) : (
                      savedStates.map(state => (
                        <div
                          key={state.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                        >
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {state.name}
                            </h4>
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="w-3 h-3" />
                              {formatDate(state.timestamp)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => {
                                onLoad(state.state);
                                setIsOpen(false);
                              }}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                            >
                              Load
                            </Button>
                            <Button
                              onClick={() => handleDelete(state.id)}
                              className="text-red-600 hover:text-red-700 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
} 