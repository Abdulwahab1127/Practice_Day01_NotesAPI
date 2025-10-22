import { ApiResponse, Note } from '../types';
import { authStorage } from '../utils/authStorage';

// TODO: Replace with your actual backend URL
const API_BASE_URL = 'http://localhost:3080/api'; // e.g., 'http://localhost:5000'

interface CreateNoteData {
  title: string;
  content: string;
}

interface UpdateNoteData {
  title: string;
  content: string;
}

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = authStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const getNotes = async (): Promise<ApiResponse<Note[]>> => {
  const response = await fetch(`${API_BASE_URL}/getnotes`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }

  return response.json();
};

export const createNote = async (data: CreateNoteData): Promise<ApiResponse<Note>> => {
  const response = await fetch(`${API_BASE_URL}/createnote`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create note');
  }

  return response.json();
};

export const updateNote = async (id: string, data: UpdateNoteData): Promise<ApiResponse<Note>> => {
  const response = await fetch(`${API_BASE_URL}/updatenote/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update note');
  }

  return response.json();
};

export const deleteNote = async (id: string): Promise<ApiResponse<null>> => {
  const response = await fetch(`${API_BASE_URL}/deletenote/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete note');
  }

  return response.json();
};
