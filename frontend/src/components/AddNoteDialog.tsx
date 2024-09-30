import { useRef } from "react";
import { Note } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface AddNoteDialogProps {
  onNoteSaved: (note: Note) => void;
}

const AddNoteDialog = ({ onNoteSaved }: AddNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<NoteInput>();

  async function onSubmit(input: NoteInput) {
    try {
      const noteResponse = await NotesApi.createNotes(input);
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
      <button className="btn" onClick={openModal}>
        Add Note
      </button>

      {/* Dialog modal */}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-center text-[#FF6500] ">
            Add notes
          </h3>

          {/* Main form */}
          <form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
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
                form="addNoteForm"
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

export default AddNoteDialog;
