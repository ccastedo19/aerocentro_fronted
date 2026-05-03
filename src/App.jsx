import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Rutas } from './routes/Rutas'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;