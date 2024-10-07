import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import Navbar from "./components/Navbar.tsx";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog.tsx";

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

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.log("Error deleting note", error);
      alert("Error deleting note");
    }
  }

  return (
    <>
      <Navbar />
      <AddEditNoteDialog
        onNoteSaved={(newNote) => {
          setNotes([...notes, newNote]);
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4 ">
        {notes.map((note) => (
          <Note note={note} key={note._id} onDeleteNoteClicked={deleteNote} />
        ))}
      </div>
    </>
  );
}

export default App;
