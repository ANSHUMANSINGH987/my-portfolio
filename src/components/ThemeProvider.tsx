import React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => (
  <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
