"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type WorkshopPreferences = {
  shapeWorld: string;
  scentWorld: string;
  setShapeWorld: (value: string) => void;
  setScentWorld: (value: string) => void;
};
const PreferencesContext = createContext<WorkshopPreferences | null>(null);

export function WorkshopPreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  // Optional inspiration only. No product reservation and no browser persistence.
  const [shapeWorld, setShapeWorld] = useState("");
  const [scentWorld, setScentWorld] = useState("");
  return (
    <PreferencesContext.Provider
      value={{ shapeWorld, scentWorld, setShapeWorld, setScentWorld }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
export function useWorkshopPreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("Workshop preferences require their provider.");
  return context;
}
