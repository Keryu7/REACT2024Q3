import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/notFound.tsx';
import './App.css';
import MainComponent from './components/main-component.tsx';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainComponent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
  );
};

export default App;
