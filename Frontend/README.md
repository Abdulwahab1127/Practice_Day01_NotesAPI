# Notes App

This is a simple Notes App built with React and Vite. The application allows users to create, view, edit, and delete notes in a responsive user interface.

## Project Structure

```
Frontend
├── public
├── src
│   ├── components
│   │   ├── NoteCard.tsx
│   │   ├── NoteForm.tsx
│   │   └── NotesList.tsx
│   ├── types
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Features

- **Responsive UI**: The application is designed to be responsive and works well on various screen sizes.
- **Notes Management**: Users can add new notes, view existing notes in a card format, and delete notes.
- **TypeScript Support**: The application is built using TypeScript for better type safety and developer experience.

## Getting Started

To get started with the Notes App, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd Frontend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Use the form to add new notes by entering a title and content.
- View your notes displayed in cards on the main screen.
- Each note card includes options to edit or delete the note.

## Technologies Used

- React
- Vite
- TypeScript
- TailwindCSS (for styling)

## License

This project is licensed under the MIT License.