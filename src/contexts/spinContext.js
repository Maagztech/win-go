"use client";

import React, { createContext, useState, useContext } from 'react';

const SpinContext = createContext();

export const SpinProvider = ({ children }) => {
  const [spinResult, setSpinResult] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);

  const handleSpin = (result) => {
    setSpinResult(result);
    setHasSpun(true);
  };

  return (
    <SpinContext.Provider value={{ spinResult, hasSpun, handleSpin }}>
      {children}
    </SpinContext.Provider>
  );
};

export const useSpin = () => useContext(SpinContext);
