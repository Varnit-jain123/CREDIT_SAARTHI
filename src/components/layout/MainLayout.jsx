import React from 'react';
import { FiHome, FiFileText, FiUsers, FiSettings, FiBell } from 'react-icons/fi';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <FiFileText className="text-white text-xl" />
                </div>
                <h1 className="text-2xl font-bold text-purple-600">LoanFlow Dashboard</h1>
              </div>
              
              <div className="hidden md:flex space-x-6">
                <button className="flex items-center space-x-2 text-purple-600 font-medium px-3 py-2 rounded-lg bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-all">
                  <FiHome />
                  <span>Dashboard</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-medium px-3 py-2 rounded-lg hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-all">
                  <FiUsers />
                  <span>Applications</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 font-medium px-3 py-2 rounded-lg hover:bg-purple-50 border border-transparent hover:border-purple-200 transition-all">
                  <FiFileText />
                  <span>Reports</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <FiBell className="text-xl" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                <FiSettings className="text-xl" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/50"></div>
                <div className="hidden md:block">
                  <p className="font-medium text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Loan Application Dashboard</h2>
          <p className="text-gray-600">Monitor and manage loan applications efficiently</p>
        </div>
        
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-gray-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600">© 2024 LoanFlow Dashboard. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">Help Center</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;