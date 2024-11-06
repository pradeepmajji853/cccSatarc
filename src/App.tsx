import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CrudDemo from './pages/CrudDemo';
import InjectionDemo from './pages/InjectionDemo';
import ExtraFeature from './pages/ExtraFeature';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-800 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud" element={<CrudDemo />} />
          <Route path="/injection" element={<InjectionDemo />} />
          <Route path="/extra" element={<ExtraFeature />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;