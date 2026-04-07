"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { auth, googleSignOut } from "@/lib/firebase-client";

const AppContext = createContext(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppContextProvider");
  return context;
};

export default function AppContextProvider({ children }) {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLogged(true);
      } else {
        googleSignOut();
        setLogged(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        logged,
        logout: () => setLogged(false),
        login: () => setLogged(true),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
