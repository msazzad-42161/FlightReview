import React, { createContext, useState } from 'react';
export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Query string for home screen search
  const [queryString, setQueryString] = useState('');

  const contextValue = {
    // user,
    // setUser,
    queryString, setQueryString

  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};