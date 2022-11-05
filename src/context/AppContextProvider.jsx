import * as React from "react";
import { useState } from "react";
import { auth, googleSignOut } from "../firebase/firebase";

export const AppContext = React.createContext(undefined);

const AppContextProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  React.useEffect(() => {
      auth.onAuthStateChanged( user => {
        if (user) {
            setLogged(true)
          } else {
            googleSignOut()
            setLogged(false);
          }
      })
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
};

export default AppContextProvider;
