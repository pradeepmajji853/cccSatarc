import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Shield, Code, Zap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-400" />
              <span className="font-bold text-xl">Workshop</span>
            </Link>
          </div>

          <div className="flex space-x-4">
            <Link
              to="/crud"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <Code className="h-4 w-4 mr-2" />
              HTTP requests
            </Link>
            <Link
              to="/injection"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <Menu className="h-4 w-4 mr-2" />
              HTML Injection
            </Link>
            <Link
              to="/extra"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <Zap className="h-4 w-4 mr-2" />
              Authentication Bypass
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;