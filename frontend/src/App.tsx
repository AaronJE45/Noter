import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import Navbar from "./components/Navbar.tsx";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog.tsx";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Error loading notes", error);
        alert("Error loading notes");
      }
    }

    loadNotes(); // Call the function here
  }, []); // Dependency array is empty, so it runs once on mount

  return (
    <>
      <Navbar />
      <AddNoteDialog />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ">
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </div>

      
    </>
  );
}

export default App;
