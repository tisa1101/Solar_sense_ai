import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeEngineProvider } from './context/ThemeEngineContext';
import { SignalRProvider } from './context/SignalRContext';
import { AppRoutes } from './routes/AppRoutes';
import { MiraThemeStudio } from './components/MiraThemeStudio';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeEngineProvider>
        <BrowserRouter>
          <AuthProvider>
            <SignalRProvider>
              <AppRoutes />
              {/* Floating MIRA Studio Theme & Energy Customizer across all 3 portals */}
              <MiraThemeStudio />
            </SignalRProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeEngineProvider>
    </ThemeProvider>
  );
};

export default App;
