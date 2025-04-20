/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import CreateProductModal, {
    NewProduct,
} from "../../components/modals/product/CreateProductModal";
import apiClient from "../../utils/apiClient";
import { createDataTable, destroyDataTable } from "../../utils/createDataTable";
import UpdateProductModal from "../../components/modals/product/UpdateProductModal";
import DeleteProductModal from "../../components/modals/product/DeleteProductModal";

interface ProductImage {
    id: number;
    image: string;
}

export interface Product {
    id: number;
    user_id: number;
    category_id: number;
    title: string;
    price: string;
    unit: string;
    image: ProductImage;
    created_at: string;
    updated_at: string;
}

const ProductPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productList, setProductList] = useState<Product[]>([]);
    const [updateProduct, setUpdateProduct] = useState<NewProduct>();
    const [deleteProductId, setDeleteProductId] = useState<
        number | undefined
    >();

    const productTableRef = useRef<HTMLTableElement>(null);
    const productTableInstance = useRef<DataTables.Api | null>(null);

    const reloadPage = () => {
        window.location.reload();
    };

    const handleUpdateProduct = (id: number) => {
        const product = productList.find((product) => product.id === id);
        if (product) {
            setUpdateProduct({
                id: product.id.toString(),
                name: product.title,
                price: product.price,
                unit: product.unit,
                category: product.category_id,
            });
        }
    };

    const handleDeleteId = (id: number) => {
        setDeleteProductId(id);
    };

    const fetchProductList = () => {
        setIsLoading(true);
        apiClient
            .get<Product[]>("api/products/")
            .then(({ data: list }) => {
                setProductList(list);
                setIsLoading(false);
                console.log(list);
            })
            .then((e) => console.log(e));
    };

    useEffect(() => {
        fetchProductList();
    }, []);

    useEffect(() => {
        if (productList && productTableRef.current) {
            if (productTableInstance.current) {
                destroyDataTable(productTableInstance.current);
            }
            productTableInstance.current = createDataTable(
                productTableRef.current
            );
        }

        return () => {
            if (productTableInstance.current)
                destroyDataTable(productTableInstance.current);
        };
    }, [productList]);

    if (isLoading) {
        return (
            <div id="loader" className="LoadingOverlay">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <div className="card px-5 py-5">
                            <div className="row justify-content-between ">
                                <div className="align-items-center col">
                                    <h4>Product</h4>
                                </div>
                                <div className="align-items-center col">
                                    <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#create-modal"
                                        className="float-end btn m-0  bg-primary text-white"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            <hr className="bg-dark " />
                            <div className="table-responsive">
                                <table
                                    className="display stripe cell-border hover"
                                    id="tableData"
                                    ref={productTableRef}
                                >
                                    <thead>
                                        <tr className="bg-light">
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Unit</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableList">
                                        {productList.map((product, index) => (
                                            <tr
                                                className={
                                                    index % 2 === 0
                                                        ? "even"
                                                        : "odd"
                                                }
                                                key={product.id}
                                            >
                                                <td className="sorting_1">
                                                    <img
                                                        src={`http://localhost:8000/${product?.image?.image}`}
                                                        className="w-15 h-auto"
                                                        alt=""
                                                    />
                                                </td>
                                                <td>{product.title}</td>
                                                <td>{product.price}</td>
                                                <td>{product.unit}</td>
                                                <td>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#update-modal"
                                                        type="button"
                                                        className="btn editBtn btn-sm btn-outline-success mx-1"
                                                        onClick={() =>
                                                            handleUpdateProduct(
                                                                product.id
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#delete-modal"
                                                        type="button"
                                                        className="btn deleteBtn btn-sm btn-outline-danger mx-1"
                                                        onClick={() => {
                                                            handleDeleteId(
                                                                product.id
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CreateProductModal realoadPage={reloadPage} />
            <UpdateProductModal
                product={updateProduct}
                reloadPage={reloadPage}
            />
            <DeleteProductModal id={deleteProductId} reloadPage={reloadPage} />
        </div>
    );
};

export default ProductPage;
