import { useRef } from "react";
import apiClient from "../../../utils/apiClient";

interface Props {
    categoryId: number;
    reloadPage: () => void;
}

const DeleteCategoryModal = ({ categoryId, reloadPage }: Props) => {
    const closeButton = useRef<HTMLButtonElement>(null);
    const handleDelete = () => {
        apiClient
            .delete(`api/category/${categoryId}/`)
            .then(() => {
                if (closeButton.current) closeButton.current.click();

                reloadPage();
            })
            .catch((e) => console.log(e));
    };
    return (
        <div className="modal animated zoomIn" id="delete-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h3 className=" mt-3 text-warning">Delete !</h3>
                        <p className="mb-3">
                            Are you sure you want to delete this category.
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
                                ref={closeButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
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

export default DeleteCategoryModal;
