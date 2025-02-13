/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Category } from "../../../pages/dashboard/Category";
import apiClient from "../../../utils/apiClient";

export interface NewProduct {
    id: string;
    name: string;
    price: string;
    unit: string;
    img: File | null;
    category_id: string;
}

interface Props {
    fetchProducts: () => void;
}

const CreateProductModal = ({ fetchProducts }: Props) => {
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");

    const [newImage, setNewImage] = useState<string>();
    const [categoryList, setCategoryList] = useState<Category[]>();

    const [newProduct, setNewProduct] = useState<NewProduct>({
        id: "",
        name: "",
        price: "",
        unit: "",
        img: null,
        category_id: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setNewProduct((prev) => ({ ...prev, img: file }));
            setNewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleClose = () => {
        setNewImage("");
    };

    const handleCreateProduct = () => {
        if (!newProduct.img) {
            setError(true);
            setErrorMsg("Please select an image.");
        }

        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("unit", newProduct.unit);
        formData.append("category_id", newProduct.category_id);
        if (newProduct.img) formData.append("img", newProduct.img);

        console.log(formData.get("img"));
        console.log(formData);

        apiClient
            .post("/create-product", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                console.log("Upload Success:", res);
                fetchProducts();
            })
            .catch((e) => {
                console.error("Upload Error:", e);
            });
    };

    useEffect(() => {
        apiClient
            .get<Category[]>("/list-category")
            .then(({ data: list }) => {
                setCategoryList(list);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div
            className="modal animated zoomIn"
            id="create-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Create Product
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form id="save-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label mt-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productName"
                                            name="name"
                                            value={newProduct.name}
                                            onChange={handleInputChange}
                                        />

                                        <label className="form-label mt-2">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productPrice"
                                            name="price"
                                            value={newProduct.price}
                                            onChange={handleInputChange}
                                        />

                                        <label className="form-label mt-2">
                                            Unit
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productUnit"
                                            name="unit"
                                            value={newProduct.unit}
                                            onChange={handleInputChange}
                                        />

                                        <label className="form-label">
                                            Category
                                        </label>
                                        <select
                                            typeof="text"
                                            className="form-control form-select"
                                            id="productCategory"
                                            name="category_id"
                                            onChange={handleInputChange}
                                        >
                                            <option>Select a category</option>
                                            {categoryList?.map((category) => (
                                                <option value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>

                                        <br />
                                        {newImage && (
                                            <img
                                                className="w-15"
                                                id="newImg"
                                                src={newImage}
                                            />
                                        )}
                                        <br />

                                        <label className="form-label">
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="productImg"
                                            onChange={handleImageInput}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            id="modal-close"
                            className="btn bg-gradient-primary mx-2"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        <button
                            id="save-btn"
                            className="btn bg-gradient-success"
                            onClick={handleCreateProduct}
                        >
                            Save
                        </button>
                    </div>
                    {error && (
                        <div className="modal-footer">
                            <p className="text-danger">{errorMsg}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateProductModal;
