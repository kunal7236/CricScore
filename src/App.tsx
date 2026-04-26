import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MatchDetails from './pages/MatchDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-slate-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/match/:id" element={<MatchDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;