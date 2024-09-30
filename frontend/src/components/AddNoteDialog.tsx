import { useRef } from "react";

const AddNoteDialog = () => {
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
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* The button will close the modal when clicked */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddNoteDialog;
