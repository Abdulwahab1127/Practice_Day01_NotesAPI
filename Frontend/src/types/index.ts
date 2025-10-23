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
  // The backend may return a populated user object or just a user id string
  user?:
    | {
        _id: string;
        name: string;
        email: string;
      }
    | string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}