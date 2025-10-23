import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-indigo-600">Notes App</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-gray-700 hover:text-gray-900">
              Dashboard
            </Link>
            <Link to="/others" className="text-sm text-gray-700 hover:text-gray-900">
              Feed
            </Link>

            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  <span className="font-medium">{user.name}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="text-sm text-gray-700 hover:text-gray-900">
                  Sign in
                </Link>
                <Link to="/signup" className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
