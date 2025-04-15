import { useEffect, useRef } from "react";
import apiClient from "../../../utils/apiClient";

interface Props {
    customer_id: number;
    realoadPage: () => void;
}

const DeleteCustomerModal = ({ customer_id, realoadPage }: Props) => {
    const closeButton = useRef<HTMLButtonElement>(null);
    const handleCustomerDelete = () => {
        if (customer_id !== -1) {
            apiClient
                .delete(`/api/customer/${customer_id}/`)
                .then(() => {
                    if (closeButton.current) closeButton.current.click();
                    realoadPage();
                })
                .catch((e) => console.log(e));
        }
    };
    useEffect(() => {}, [customer_id]);
    return (
        <div className="modal animated zoomIn" id="delete-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h3 className=" mt-3 text-warning">Delete !</h3>
                        <p className="mb-3">
                            Are you sure you want to delete this customer.
                        </p>
                        <input className="d-none" id="deleteID" />
                    </div>
                    <div className="modal-footer justify-content-end">
                        <div>
                            <button
                                type="button"
                                id="delete-modal-close"
                                className="btn mx-2 bg-gradient-primary"
                                data-bs-dismiss="modal"
                                ref={closeButton}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                id="confirmDelete"
                                className="btn  bg-gradient-danger"
                                onClick={handleCustomerDelete}
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

export default DeleteCustomerModal;
