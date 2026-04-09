import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Task {
  id: string;
  text: string;
  points: number;
}

interface HistoryDay {
  date: string;
  completed: number;
}

interface AppState {
  tasks: Task[];
  streak: number;
  score: number;
  chainsBroken: number;
  history: HistoryDay[];
  addTask: (text: string) => void;
  removeTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  incrementScore: () => void;
  resetStreak: () => void;
  incrementChains: () => void;
  addToHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      tasks: [],
      streak: 0,
      score: 0,
      chainsBroken: 0,
      history: [],
      addTask: (text) => set((state) => ({
        tasks: [...state.tasks, { id: Date.now().toString(), text, points: 0 }]
      })),
      removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id)
      })),
      setTasks: (tasks) => set({ tasks }),
      incrementScore: () => set((state) => ({ 
        score: state.score + 10,
        streak: state.streak + 1 
      })),
      resetStreak: () => set({ streak: 0 }),
      incrementChains: () => set((state) => ({ chainsBroken: state.chainsBroken + 1 })),
      addToHistory: () => set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const history = [...state.history];
          const existing = history.find(h => h.date === today);
          if (existing) {
              existing.completed += 1;
          } else {
              history.push({ date: today, completed: 1 });
          }
          return { history };
      }),
    }),
    {
      name: 'unstuck-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
