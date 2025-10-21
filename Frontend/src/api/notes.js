// Replace this URL with your actual backend URL (e.g., http://localhost:5000/api/notes)
const API_BASE_URL = 'http://localhost:5000/api/notes'

export const fetchNotes = async () => {
  try {
    const response = await fetch('http://localhost:3080/api/getnotes')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.data || []  // Extract the data array from the response
  } catch (error) {
    console.error('Error fetching notes:', error)
    throw error
  }
}

export const createNote = async (noteData) => {
  try {
    const response = await fetch('http://localhost:3080/api/createnote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData)
    })
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating note:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const result = await response.json()
    return result.data  // Extract the data from the response
  } catch (error) {
    console.error('Error creating note:', error)
    throw error
  }
}

export const updateNote = async (id, noteData) => {
  try {
    const response = await fetch(`http://localhost:3080/api/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData)
    });

    if (!response.ok) {
      const errorData = await response.json(); // Get error details from response
      console.error('Error updating note:', errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data; // Ensure you're returning the correct data structure
  } catch (error) {
    console.error('Error updating note:', error)
    throw error
  }
}

export const deleteNote = async (id) => {
  try {
    const response = await fetch(`http://localhost:3080/api/deletenote/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return true
  } catch (error) {
    console.error('Error deleting note:', error)
    throw error
  }
}