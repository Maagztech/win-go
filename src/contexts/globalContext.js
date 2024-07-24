"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const isMobileQuery = useMediaQuery({ query: '(max-width: 800px)' });
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsMobile(isMobileQuery);
        }
    }, [isMobileQuery]);

    return (
        <GlobalContext.Provider value={{ isMobile }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
