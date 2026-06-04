"use client";

import { createContext, useContext } from "react";

const MockupAnimationContext = createContext(true);

export function MockupAnimationProvider({
  animated = true,
  children,
}: {
  animated?: boolean;
  children: React.ReactNode;
}) {
  return (
    <MockupAnimationContext.Provider value={animated}>
      {children}
    </MockupAnimationContext.Provider>
  );
}

export function useMockupAnimated() {
  return useContext(MockupAnimationContext);
}
