import { useEffect } from "react";
import apiClient from "../../../utils/apiClient";

interface Props {
    id: number | undefined;
    reloadPage: () => void;
}

const DeleteInvoiceModal = ({ id, reloadPage }: Props) => {
    const handleDelete = () => {
        const payload = {
            inv_id: id,
        };
        apiClient
            .post("/invoice-delete", payload)
            .then((res) => {
                console.log(res);
                reloadPage();
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {}, [id]);

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
                                onClick={() => {
                                    handleDelete();
                                }}
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
