# Notes App Frontend

A clean and responsive frontend for the Notes API built with React, TypeScript, Vite, and TailwindCSS.

## Features

- ✅ User authentication (Sign up, Sign in, Logout)
- ✅ Protected routes (requires login)
- ✅ Create, Read, Update, Delete notes
- ✅ View notes with owner names
- ✅ Only note owners can edit/delete their notes
- ✅ Responsive design with TailwindCSS
- ✅ TypeScript for type safety

## Project Structure

```
Frontend/
├── src/
│   ├── api/                 # API client functions
│   │   ├── auth.ts         # Authentication API calls
│   │   └── notes.ts        # Notes CRUD API calls
│   ├── components/         # Reusable components
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── NoteCard.tsx    # Individual note display
│   │   └── NoteForm.tsx    # Create/Edit note modal
│   ├── context/            # React Context
│   │   └── AuthContext.tsx # Authentication state management
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Notes list page (protected)
│   │   ├── SignIn.tsx      # Login page
│   │   └── SignUp.tsx      # Registration page
│   ├── types/              # TypeScript types
│   │   └── index.ts        # Shared type definitions
│   ├── utils/              # Utility functions
│   │   └── authStorage.ts  # localStorage helpers
│   ├── App.tsx             # Main app with routing
│   └── main.tsx            # App entry point
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API URL

You need to update the API base URL in two files to connect to your backend:

#### File: `src/api/auth.ts`
```typescript
const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL
```

#### File: `src/api/notes.ts`
```typescript
const API_BASE_URL = 'http://localhost:5000'; // Replace with your backend URL
```

### 3. Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Backend Integration Guide

Your backend has the following endpoints:

### Authentication Endpoints

**Sign Up**
- **Endpoint**: `POST /signup`
- **Request Body**: 
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "User created successfully",
    "data": {
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
  ```

**Login**
- **Endpoint**: `POST /login`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
  }
  ```

### Notes Endpoints

All protected endpoints require the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

**Get All Notes**
- **Endpoint**: `GET /getnotes`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Notes fetched successfully",
    "data": [
      {
        "_id": "123",
        "title": "My Note",
        "content": "Note content",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "user": {
          "_id": "456",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ]
  }
  ```

**Create Note**
- **Endpoint**: `POST /createnote`
- **Request Body**:
  ```json
  {
    "title": "My New Note",
    "content": "This is the note content"
  }
  ```

**Update Note**
- **Endpoint**: `PUT /updatenote/:id`
- **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content"
  }
  ```

**Delete Note**
- **Endpoint**: `DELETE /deletenote/:id`
- **Response**:
  ```json
  {
    "success": true,
    "message": "Note deleted successfully"
  }
  ```

## How It Works

### Authentication Flow

1. User signs up or logs in
2. Backend returns JWT token (login only returns token, not user info)
3. Token is stored in localStorage
4. All protected API calls include the token in Authorization header
5. User can logout which clears localStorage

### Protected Routes

- **Home page (`/`)**: Only accessible when logged in. Shows all notes.
- **Sign In (`/signin`)**: Public route. Redirects to home if already logged in.
- **Sign Up (`/signup`)**: Public route. Redirects to home if already logged in.

### Notes Functionality

- All users can view all notes
- Each note shows the owner's name
- Only the note owner can see Edit/Delete buttons
- Creating a note requires authentication

## Important Notes

### ⚠️ User Information Limitation

The backend's `/login` endpoint only returns a JWT token, not user information. As a workaround, the current implementation:
- Uses the email from the login form as a temporary user identifier
- Creates a temporary user object with `email` and a generated `name`

**Recommended Backend Improvement:**

Add a `/me` endpoint to fetch current user info:

```javascript
// Backend: Add this to your user routes
router.get('/me', protect, async (req, res) => {
  res.json({
    success: true,
    data: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name
    }
  });
});
```

Then update `SignIn.tsx` to call this endpoint after login.

### Local Storage Keys

- `auth_token`: Stores the JWT token
- `auth_user`: Stores user information (JSON string)

## Tech Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **React Router DOM**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Context API**: State management

## Development Tips

### Debugging

1. Open browser DevTools (F12)
2. Check Console for errors
3. Check Network tab to see API calls
4. Check Application > Local Storage to see stored auth data

### Clear Auth Data

If you get stuck, clear authentication data:

```javascript
// In browser console:
localStorage.clear()
```

Then refresh the page.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Preview Production Build

```bash
npm run serve
```

## Troubleshooting

### "Failed to fetch"

- Make sure backend is running
- Check if API URL is correct in `auth.ts` and `notes.ts`
- Check CORS settings on backend

### Redirect Loop

- Clear localStorage: `localStorage.clear()`
- Check that token is being saved correctly

### TypeScript Errors

- Run `npm install` to ensure all types are installed
- Restart VS Code's TypeScript server: Cmd/Ctrl + Shift + P → "Restart TypeScript Server"

## Next Steps

1. ✅ Update API URLs in `src/api/auth.ts` and `src/api/notes.ts`
2. ✅ Start backend server
3. ✅ Start frontend with `npm run dev`
4. ✅ Test authentication flow
5. ✅ Test notes CRUD operations
6. 🔄 (Optional) Add `/me` endpoint to backend for better user management

---

Happy coding! 🚀
