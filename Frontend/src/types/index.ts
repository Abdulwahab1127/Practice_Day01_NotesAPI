// User type
export interface User {
  _id: string;
  email: string;
  name: string;
}

// Note type  
export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  user?: {
    _id: string;
    name: string;
    email: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}