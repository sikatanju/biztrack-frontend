/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef } from "react";
import apiClient from "../../../utils/apiClient";

interface Props {
    id: number | undefined;
    reloadPage: () => void;
}

const DeleteProductModal = ({ id, reloadPage }: Props) => {
    const clsButton = useRef<HTMLButtonElement>(null);
    const deleteProduct = () => {
        console.log(id);
        apiClient
            .post("/delete-product", {
                id: id?.toString(),
            })
            .then(() => {
                if (clsButton.current) clsButton.current.click();
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
                            Once delete, you can't get it back.
                        </p>
                        <input className="d-none" id="deleteID" />
                        <input className="d-none" id="deleteFilePath" />
                    </div>
                    <div className="modal-footer justify-content-end">
                        <div>
                            <button
                                type="button"
                                id="delete-modal-close"
                                className="btn bg-gradient-success mx-2"
                                data-bs-dismiss="modal"
                                ref={clsButton}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                id="confirmDelete"
                                className="btn bg-gradient-danger"
                                onClick={deleteProduct}
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

export default DeleteProductModal;
