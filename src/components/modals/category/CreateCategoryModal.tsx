import { useRef, useState } from "react";
import apiClient from "../../../utils/apiClient";

interface Props {
    reloadPage: () => void;
}

const CreateCategoryModal = ({ reloadPage }: Props) => {
    const [newCategory, setNewCategory] = useState<string>("");
    const closeButton = useRef<HTMLButtonElement>(null);

    const handleCategoryInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setNewCategory(e.target.value);
    };

    const handleCreateCategory = () => {
        if (newCategory) {
            apiClient
                .post("/create-category", { name: newCategory })
                .then(() => {
                    setNewCategory("");
                    if (closeButton.current) closeButton.current.click();
                    reloadPage();
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }
    };
    return (
        <div
            className="modal animated zoomIn"
            id="create-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLabel">
                            Create Category
                        </h6>
                    </div>
                    <div className="modal-body">
                        <form id="save-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">
                                            Category Name*
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryName"
                                            placeholder="enter category name"
                                            value={newCategory}
                                            onChange={handleCategoryInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="modal-close"
                            className="btn bg-gradient-primary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ref={closeButton}
                        >
                            Close
                        </button>
                        <button
                            id="save-btn"
                            className="btn bg-gradient-success"
                            onClick={handleCreateCategory}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryModal;
