import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIInsights from './pages/AIInsights';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ai-insights" element={<AIInsights />} />
      </Routes>
    </Router>
  );
}

export default App;
