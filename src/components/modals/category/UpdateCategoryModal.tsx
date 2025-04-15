import { useEffect, useRef, useState } from "react";
import apiClient from "../../../utils/apiClient";
import { Category } from "../../../pages/dashboard/Category";

interface Props {
    category: Category | undefined;
    reloadPage: () => void;
}

const UpdateCategoryModal = ({ category, reloadPage }: Props) => {
    const closeButton = useRef<HTMLButtonElement | null>(null);
    const [newCategoryName, setNewCategoryName] = useState<string>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value);
    };

    const handleUpdateCategory = () => {
        if (category && category.id !== -1) {
            apiClient
                .post("/update-category", {
                    name: newCategoryName,
                    id: category,
                })
                .then(() => {
                    if (closeButton.current) closeButton.current.click();
                    reloadPage();
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            console.log("Invalid Category ID");
        }
    };

    useEffect(() => {
        setNewCategoryName(category?.name)
    }, [category])

    return (
        <div
            className="modal animated zoomIn"
            id="update-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Update Category
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form id="update-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">
                                            Category Name *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="categoryNameUpdate"
                                            value={newCategoryName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="update-modal-close"
                            className="btn bg-gradient-primary"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            ref={closeButton}
                        >
                            Close
                        </button>
                        <button
                            id="update-btn"
                            className="btn bg-gradient-success"
                            onClick={handleUpdateCategory}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategoryModal;
