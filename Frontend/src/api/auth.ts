import SignIn from '@/pages/SignIn';
import { ApiResponse, User } from '../types';

// TODO: Replace with your actual backend URL
const API_BASE_URL = 'http://localhost:3080/api/user'; // e.g., 'http://localhost:5000'

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const signIn = async (
  data: SignInData
): Promise<ApiResponse<{ token: string; user: User }>> => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Parse response first
  const result = await response.json();

  // Handle API-level errors clearly
  if (!response.ok || !result.success) {
    throw new Error(result.message || "Login failed");
  }

  return result;
};


export const signUp = async (data: SignUpData): Promise<ApiResponse<{ user: User }>> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
};
