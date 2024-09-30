import { useState } from "react";
import { Note as NoteModel } from "../models/note"; 
import { formatDate } from "../utils/formatDate"; 

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text = "", createdAt, updatedAt } = note;

  // Set a threshold for when to show the "Show more" button (e.g., 100 characters)
  const textThreshold = 100;

  // State to track whether the note is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the expanded state when the user clicks "Show more"
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  let createdUpdatedText: string;

  if(updatedAt > createdAt) {
    createdUpdatedText = "Updated at: " + formatDate(updatedAt);
  }
  else{
    createdUpdatedText = "Created at: " + formatDate(createdAt);
  }

  return (
    <div className="bg-[#000000] shadow-lg mt-12 rounded-lg overflow-hidden border border-transparent hover:border-[#FF6500] hover:cursor-pointer hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
      <div className="flex flex-col h-full min-h-[200px] p-2">
        {/* Title Section */}
        <h2 className="text-[#FFFFFF] text-xl font-bold mb-4">{title}</h2>

        {/* Note Text */}
        <p
          className={`whitespace-pre-line text-gray-300 mb-4 flex-grow ${
            isExpanded ? "" : "overflow-hidden text-ellipsis max-h-[100px]"
          }`}
        >
          {text}
        </p>

        {/* Conditionally render the "Show more" button only if the text exceeds the threshold */}
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
