import React from "react";

const DeleteInvoiceModal = () => {
    return (
        <div className="modal animated zoomIn deleteModal" id="delete-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h3 className=" mt-3 text-warning">Delete !</h3>
                        <p className="mb-3">
                            Once delete, you can't get it back.
                        </p>
                        <input className="d-none" id="deleteID" />
                    </div>
                    <div className="modal-footer justify-content-end">
                        <div>
                            <button
                                type="button"
                                id="delete-modal-close"
                                className="btn bg-gradient-success mx-2"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {}}
                                type="button"
                                id="confirmDelete"
                                className="btn bg-gradient-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteInvoiceModal;
