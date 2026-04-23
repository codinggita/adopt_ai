import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes';

const App = () => {
  return (
    <div className="app">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
};

export default App;
