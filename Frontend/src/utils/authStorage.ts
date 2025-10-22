import { User } from '../types';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const authStorage = {
  // Store auth data
  setAuth: (token: string, user: User) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get user
  getUser: (): User | null => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  // Get both token and user
  getAuth: (): { token: string; user: User } | null => {
    const token = authStorage.getToken();
    const user = authStorage.getUser();
    
    if (!token || !user) {
      authStorage.clearAuth();
      return null;
    }
    
    return { token, user };
  },

  // Clear all auth data
  clearAuth: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  // Check if authenticated
  isAuthenticated: (): boolean => {
    const auth = authStorage.getAuth();
    return auth !== null;
  }
};
