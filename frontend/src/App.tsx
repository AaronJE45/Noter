import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import Navbar from "./components/Navbar.tsx";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        });
        const notes = await response.json();
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-self-auto">
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </div>
    </>
  );
}

export default App;
