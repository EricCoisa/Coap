import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SidebarContextType {
  isMinimized: boolean;
  setIsMinimized: (minimized: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export { SidebarContext };

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  const value = {
    isMinimized,
    setIsMinimized,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}
