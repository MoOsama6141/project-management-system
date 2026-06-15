import React from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="theme-provider">{children}</div>;
};

export default ThemeProvider;
