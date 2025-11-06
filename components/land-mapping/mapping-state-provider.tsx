'use client';

import * as React from 'react';

interface MappingState {
  showStartButton: boolean;
  setShowStartButton: (show: boolean) => void;
}

const MappingStateContext = React.createContext<MappingState | undefined>(undefined);

export function MappingStateProvider({ children }: { children: React.ReactNode }) {
  const [showStartButton, setShowStartButton] = React.useState(false);

  const value = React.useMemo(() => ({
    showStartButton,
    setShowStartButton
  }), [showStartButton]);

  return (
    <MappingStateContext.Provider value={value}>
      {children}
    </MappingStateContext.Provider>
  );
}

export function useMappingState() {
  const context = React.useContext(MappingStateContext);
  if (!context) {
    throw new Error('useMappingState must be used within a MappingStateProvider');
  }
  return context;
}