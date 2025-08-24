import { useEffect, useState } from "react";
import apiClient from "../../../utils/apiClient";
import { NewProduct } from "./CreateProductModal";
import { CategoryInf } from "../../../utils/types";

interface Props {
    product: NewProduct | undefined;
    reloadPage: () => void;
}

const UpdateProductModal = ({ product, reloadPage }: Props) => {
    const [categoryList, setCategoryList] = useState<CategoryInf[]>();
    const [newProduct, setNewProduct] = useState<NewProduct | undefined>(
        product
    );

    const getInitialCategory = (product?: NewProduct) => {
        if (product && categoryList) {
            const title = categoryList.find(
                (cat) => cat.id == product.category
            )?.title;

            return title;
        }
        return "Nan";
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev!,
            [name]: name === "price" || name === "category" ? Number(value) : value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newProduct) {
            const payload = {
                id: newProduct.id,
                title: newProduct.name,   // map `name` → `title`
                price: newProduct.price,
                unit: newProduct.unit,
                category: newProduct.category,
            };
            apiClient
                .put(`api/products/${newProduct.id}/`, payload)
                .then(() => {
                    reloadPage();
                })
                .catch((e) => {
                    console.error("Upload Error:", e);
                });
        }
    };

    useEffect(() => {
        apiClient
            .get<CategoryInf[]>("api/categories/")
            .then(({ data: list }) => {
                setCategoryList(list);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
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
                                        {/* <select
                                            className="form-control form-select"
                                            id="productCategory"
                                            name="category"
                                            value={newProduct?.category}
                                            onChange={handleInputChange}
                                        >
                                            {categoryList?.map((category) => (
                                                <option value={category.id} key={category.id}>
                                                    {category.title}
                                                </option>
                                            ))}
                                        </select> */}

                                        <select
                                            typeof="text"
                                            className="form-control form-select"
                                            id="productCategory"
                                            name="category"
                                            onChange={handleInputChange}
                                        >
                                            <option
                                                value={newProduct?.category}
                                                key={newProduct?.id}
                                            >
                                                {getInitialCategory(newProduct)}
                                            </option>
                                            {categoryList?.map((category) => (
                                                <option
                                                    value={category.id}
                                                    key={category.id}
                                                >
                                                    {category.title}
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
