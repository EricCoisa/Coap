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
  // Sidebar inicia fechado no mobile, aberto no desktop
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;
  const [isMinimized, setIsMinimized] = useState(isMobile);

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
