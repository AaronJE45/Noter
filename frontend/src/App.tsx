import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

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
      <h1 className="text-6xl font-bold mb-[30px] text-white">Noter</h1>
      {notes.map((note) => (
        <Note note={note} key={note._id} />
      ))}
    </>
  );
}

export default App;
