import { ReactNode } from 'react';

export interface Panel {
  id: string;
  title: string;
  content: ReactNode;
}

// This function will be passed to NavigationNodes to handle navigation
export type NavigateFunction = (targetId: string) => void;

// Factory function to create panels with consistent structure
export const createPanel = (id: string, title: string, content: ReactNode): Panel => {
  return { id, title, content };
};

// We'll populate this array in the Canvas component
export const panels: Panel[] = [];
