'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PresentationContextType {
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
}

const PresentationContext = createContext<PresentationContextType>({
  isPresentationMode: false,
  togglePresentationMode: () => {},
});

export function PresentationProvider({ children }: { children: ReactNode }) {
  const [isPresentationMode, setIsPresentationMode] = useState(false);

  const togglePresentationMode = () => {
    setIsPresentationMode((prev) => !prev);
  };

  return (
    <PresentationContext.Provider value={{ isPresentationMode, togglePresentationMode }}>
      <div className={isPresentationMode ? 'presentation-mode-active text-[115%]' : ''}>
        {children}
      </div>
    </PresentationContext.Provider>
  );
}

export function usePresentationMode() {
  return useContext(PresentationContext);
}
