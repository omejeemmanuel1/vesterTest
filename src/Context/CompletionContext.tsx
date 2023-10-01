// CompletionContext.tsx
import React, { createContext, useState, useContext } from "react";

interface CompletionContextType {
  teamInfoCompleted: boolean;
  completeTeamInfo: () => void;
}

const CompletionContext = createContext<CompletionContextType | undefined>(
  undefined
);

export function CompletionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [teamInfoCompleted, setTeamInfoCompleted] = useState(() => {
    // Initialize the state from localStorage if available
    const storedTeamInfoCompleted = localStorage.getItem("teamInfoCompleted");
    return storedTeamInfoCompleted
      ? JSON.parse(storedTeamInfoCompleted)
      : false;
  });

  const completeTeamInfo = () => {
    setTeamInfoCompleted(true);

    // Store the completion state in localStorage
    localStorage.setItem("teamInfoCompleted", JSON.stringify(true));
  };

  return (
    <CompletionContext.Provider value={{ teamInfoCompleted, completeTeamInfo }}>
      {children}
    </CompletionContext.Provider>
  );
}

export function useCompletion() {
  const context = useContext(CompletionContext);
  if (!context) {
    throw new Error("useCompletion must be used within a CompletionProvider");
  }
  return context;
}
