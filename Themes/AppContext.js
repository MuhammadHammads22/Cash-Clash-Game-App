import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Define the available themes
const themes = {
  light: {
    background: '#ffffff',
    color: '#000000',
  },
  dark: {
    background: '#000000',
    color: '#ffffff',
  },
};
// Create the context with 'light' as the default theme
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.light); // Default theme is light
  const [socket, setSocket] = useState('');
  // Function to toggle between light and dark themes
  useEffect(() => {
    const newSocket = io('http://10.0.2.2:3000');
    setSocket(newSocket);

    // Clean up on unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ socket, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext, themes };
