import { useState } from "react";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { TbHttpDelete } from "react-icons/tb";
 

interface NoteProps {
  onNoteClicked?: (note: NoteModel) => void; 
  note: NoteModel;
  onDeleteNoteClicked: (noteId: NoteModel) => void;
}

const Note = ({ note, onDeleteNoteClicked }: NoteProps) => {
  const { title, text = "", createdAt, updatedAt } = note;

  // Set a threshold for when to show the "Show more" button
  const textThreshold = 100;

  // State to track whether the note is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Determine which date to show
  const createdUpdatedText =
    updatedAt > createdAt
      ? "Updated at: " + formatDate(updatedAt)
      : "Created at: " + formatDate(createdAt);

  return (
    <div className="bg-[#000000] shadow-lg mt-12 rounded-lg overflow-hidden border border-transparent hover:border-[#FAFAFA] hover:cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
      <div className="flex flex-col h-full min-h-[200px]">
        {/* Title Section with Delete Icon */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#FFFFFF] text-xl font-bold">{title}</h2>
          <TbHttpDelete 
          className="text-[#FFFFFF] text-lg hover:text-[#FF6500] cursor-pointer"
          onClick={(e) => {
            onDeleteNoteClicked(note);
             e.stopPropagation();
          }} />
        </div>

        {/* Note Text with conditional expansion */}
        <p
          className={`whitespace-pre-line text-gray-300 mb-4 ${
            isExpanded ? "max-h-none" : "overflow-hidden text-ellipsis max-h-[100px]"
          }`}
        >
          {text}
        </p>

        {/* Show more/less button */}
        {text.length > textThreshold && (
          <button
            className="text-[#FF6500] text-sm focus:outline-none mb-4"
            onClick={toggleExpanded}
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}

        {/* Footer Section with Timestamps */}
        <div className="mt-auto text-xs text-[#808080]">
          {createdUpdatedText}
        </div>
      </div>
    </div>
  );
};

export default Note;
