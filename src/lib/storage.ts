import { CalculatorState } from '../types/calculator';

const STORAGE_KEY = 'newsletter-calculator-state';
const MAX_SAVED_STATES = 10;

export interface SavedState {
  id: string;
  name: string;
  timestamp: number;
  state: CalculatorState;
}

export function saveCalculatorState(name: string, state: CalculatorState): SavedState {
  const savedStates = getSavedStates();
  
  // Create new saved state
  const newState: SavedState = {
    id: crypto.randomUUID(),
    name,
    timestamp: Date.now(),
    state
  };

  // Add to beginning of array and limit to MAX_SAVED_STATES
  const updatedStates = [newState, ...savedStates].slice(0, MAX_SAVED_STATES);
  
  // Save to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStates));
  
  return newState;
}

export function getSavedStates(): SavedState[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved states:', error);
    return [];
  }
}

export function loadCalculatorState(id: string): CalculatorState | null {
  const savedStates = getSavedStates();
  const savedState = savedStates.find(state => state.id === id);
  return savedState?.state || null;
}

export function deleteSavedState(id: string): void {
  const savedStates = getSavedStates();
  const updatedStates = savedStates.filter(state => state.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStates));
} 