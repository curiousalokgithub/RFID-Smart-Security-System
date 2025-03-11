import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Menu, Bell, Settings, Users, Activity, LogOut, Brain } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import Dashboard from './components/Dashboard';
import UsersPage from './components/UsersPage';
import AlertsPage from './components/AlertsPage';
import MLInsightsPage from './components/MLInsightsPage';
import SettingsPage from './components/SettingsPage';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(2);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Toaster />
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed md:relative md:translate-x-0 z-30 md:z-0 transition-transform duration-300 ease-in-out flex flex-col w-64 h-full bg-indigo-700 text-white`}
        >
          <div className="p-4">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Shield className="h-8 w-8" />
              <span className="text-xl font-bold">SecureRFID</span>
            </Link>
          </div>
          <nav className="flex-1 p-4">
            <SidebarNavigation closeMobileMenu={() => setIsMobileMenuOpen(false)} />
          </nav>
          <div className="p-4 border-t border-indigo-800">
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 text-indigo-200 hover:text-white transition-colors duration-200 w-full"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell className="h-6 w-6 text-gray-500" />
                  {notifications > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
                  )}
                </button>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Profile"
                    className="h-8 w-8 rounded-full cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <span className="text-sm font-medium text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/ml-insights" element={<MLInsightsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

const SidebarNavigation = ({ closeMobileMenu }: { closeMobileMenu: () => void }) => {
  const location = useLocation();

  const navItems = [
    { icon: <Activity />, text: 'Dashboard', path: '/' },
    { icon: <Users />, text: 'Users', path: '/users' },
    { icon: <Bell />, text: 'Alerts', path: '/alerts' },
    { icon: <Brain />, text: 'ML Insights', path: '/ml-insights' },
    { icon: <Settings />, text: 'Settings', path: '/settings' },
  ];

  return (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            onClick={closeMobileMenu}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-indigo-800 text-white'
                : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
            }`}
          >
            {item.icon}
            <span>{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default App;