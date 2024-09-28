import { Note as NoteModel } from "../models/note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <div className="bg-[#000000] shadow-lg mt-12 rounded-lg overflow-hidden border border-transparent hover:border-[#FF6500] hover:shadow-2xl transition-all duration-300 ease-in-out p-4">
      {/* Title Section */}
      <h2 className="text-[#FF6500] text-xl font-bold mb-4">{title}</h2>

      {/* Note Text */}
      <p className="whitespace-pre-line text-gray-300 mb-4">
        {text}
      </p>

      {/* Timestamps */}
      <div className="text-xs text-[#808080]">
        <p>Created at: {createdAt}</p>
        <p>Updated at: {updatedAt}</p>
      </div>
    </div>
  );
};

export default Note;
