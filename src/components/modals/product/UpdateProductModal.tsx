/* eslint-disable @typescript-eslint/no-empty-object-type */

import { useEffect, useState } from "react";
import { Category } from "../../../pages/dashboard/Category";
import apiClient from "../../../utils/apiClient";
import { NewProduct } from "./CreateProductModal";

interface Props {
    product: NewProduct | undefined;
    reloadPage: () => void;
}

const UpdateProductModal = ({ product, reloadPage }: Props) => {
    const [categoryList, setCategoryList] = useState<Category[]>();
    const [newProduct, setNewProduct] = useState<NewProduct | undefined>(
        product
    );

    const getInitialCategory = (id: string | undefined) => {
        if (id)
            return categoryList?.find((cat) => cat.id === Number.parseInt(id))
                ?.name;
        return "Nan";
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev!, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newProduct) {
            const formData = new FormData();
            formData.append("name", newProduct.name);
            formData.append("price", newProduct.price);
            formData.append("unit", newProduct.unit);
            formData.append("category_id", newProduct.category_id);
            formData.append("id", newProduct.id);
            if (newProduct.img) formData.append("img", newProduct.img);

            console.log(formData);
            apiClient
                .post("/update-product", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    // console.log("Upload Success:", res);
                    reloadPage();
                })
                .catch((e) => {
                    console.error("Upload Error:", e);
                });
        }
    };

    useEffect(() => {
        apiClient
            .get<Category[]>("/list-category")
            .then(({ data: list }) => {
                setCategoryList(list);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        console.log("In Update MOdal :)");

        setNewProduct(product);
    }, [product]);

    return (
        <div
            className="modal animated zoomIn"
            id="update-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Update Product
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form id="update-form" onSubmit={handleFormSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label mt-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productNameUpdate"
                                            name="name"
                                            value={newProduct?.name}
                                            onChange={handleInputChange}
                                        />

                                        <label className="form-label mt-2">
                                            Price
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productPriceUpdate"
                                            name="price"
                                            value={newProduct?.price}
                                            onChange={handleInputChange}
                                        />

                                        <label className="form-label mt-2">
                                            Unit
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="productUnitUpdate"
                                            name="unit"
                                            value={newProduct?.unit}
                                            onChange={handleInputChange}
                                        />
                                        <br />
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
                                            <option
                                                value={product?.category_id}
                                            >
                                                {getInitialCategory(
                                                    product?.category_id
                                                )}
                                            </option>
                                            {categoryList?.map((category) => (
                                                <option value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                        {/* <img
                                            className="w-15"
                                            id="oldImg"
                                            src="./images/default.jpg"
                                        /> */}
                                        <br />
                                        <label className="form-label mt-2">
                                            Image
                                        </label>
                                        <input
                                            // oninput="oldImg.src=window.URL.createObjectURL(this.files[0])"
                                            type="file"
                                            className="form-control"
                                            id="productImgUpdate"
                                        />

                                        <input
                                            type="text"
                                            className="d-none"
                                            id="updateID"
                                        />
                                        <input
                                            type="text"
                                            className="d-none"
                                            id="filePath"
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
                        >
                            Close
                        </button>
                        <button
                            id="update-btn"
                            form="update-form"
                            className="btn bg-gradient-success"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductModal;
