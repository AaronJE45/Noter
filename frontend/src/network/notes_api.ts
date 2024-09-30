import { Note } from "../models/note";

async function fetchData(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.message;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "GET",
  });
  return response.json();
}

export interface NoteInput {
  title: string;
  text: string;
}

export async function createNotes(note: NoteInput): Promise<Note> {
  const response = await fetch("http://localhost:5000/api/notes", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(note),
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`Failed to create note: ${errorText}`);
  }

  return response.json();
}
