import { useRef } from "react";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { FaPlus } from "react-icons/fa6";

interface AddEditNoteDialogProps {
  noteToEdit?: Note | null;
  onNoteSaved: (note: Note) => void;
}

const AddEditNoteDialog = ({
  onNoteSaved,
  noteToEdit,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text,
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: Note;

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNotes(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNotes(input);
      }
      onNoteSaved(noteResponse);

      modalRef.current?.close();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  // Create a ref to access the dialog element
  const modalRef = useRef<HTMLDialogElement>(null);

  // Function to show the modal
  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <div className="flex flex-col items-center">
        <button className="btn rounded-lg" onClick={openModal}>
          <FaPlus className="text-[#FF6500]" />{" "}
          {noteToEdit ? "Edit Note" : "Add Note"}
        </button>
      </div>

      {/* Dialog modal */}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box ">
          <h3 className="font-bold text-2xl text-center text-[#FF6500] ">
            Add notes
          </h3>

          {/* Main form */}
          <form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
            <div className="p-4 flex flex-col gap-2">
              <div className="form-control">
                <label htmlFor="note-title" className="label">
                  <span className="label-text text-lg">Title</span>
                </label>
                <input
                  id="note-title"
                  type="text"
                  {...register("title", { required: "Required" })}
                  className="input input-bordered hover:border-[#FF6500] w-full"
                />
              </div>

              <div className="form-control">
                <label htmlFor="note-text" className="label">
                  <span className="label-text text-lg">Text</span>
                </label>
                <textarea
                  id="note-text"
                  {...register("text")}
                  className="textarea textarea-bordered w-full h-40 hover:border-[#FF6500]"
                />
              </div>
            </div>

            {/* Modal actions */}
            <div className="modal-action">
              {/* Button to close the modal */}
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current?.close()}
              >
                Close
              </button>

              {/* Save button */}
              <button
                type="submit"
                form="addEditNoteForm"
                className="btn text-[#FF6500]"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddEditNoteDialog;
