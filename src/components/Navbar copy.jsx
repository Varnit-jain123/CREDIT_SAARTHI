// src/components/Navbar.jsx
import React, { useState } from 'react';
import { User, Menu } from 'lucide-react';

const Navbar = ({ loggedInUser, onLogout }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-blue-900">
              Credit<span className="text-blue-600">Saarthi</span>
            </div>
            <div className="hidden md:flex ml-10 space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Loan Schemes</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Eligibility</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-800">
                  {loggedInUser?.name || 'User'}
                </div>
                <div className="text-xs text-gray-500">{loggedInUser?.role}</div>
              </div>
              <button
                onClick={onLogout}
                className="ml-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition"
              >
                Logout
              </button>
            </div>
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            <a href="#" className="block text-gray-700 hover:text-blue-600">Home</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">Loan Schemes</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">Eligibility</a>
            <a href="#" className="block text-gray-700 hover:text-blue-600">Contact</a>
            <button
              onClick={onLogout}
              className="w-full text-left text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
