import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/note";

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
      <h1 className="text-6xl font-bold mb-[30px] text-white">Taker Notes</h1>
      {JSON.stringify(notes)};
    </>
  );
}

export default App;
