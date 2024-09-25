import { Note as NoteModel } from "../models/note";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  return (
    <div className="card bg-base-100 w-96 shadow-xl mt-[3rem]">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="whitespace-pre-line">{text}</p>
        <p className="text-xs text-right text-white">{createdAt}</p>
      </div>
    </div>
  );
};

export default Note;
