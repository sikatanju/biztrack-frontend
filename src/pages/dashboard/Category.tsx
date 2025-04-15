import { useEffect, useRef, useState } from "react";
import CreateCategoryModal from "../../components/modals/category/CreateCategoryModal";
import DeleteCategoryModal from "../../components/modals/category/DeleteCategoryModal";
import UpdateCategoryModal from "../../components/modals/category/UpdateCategoryModal";
import apiClient from "../../utils/apiClient";
import { createDataTable, destroyDataTable } from "../../utils/createDataTable";

export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
    user_id: string;
}

const Category = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoryList, setCategoryList] = useState<Category[]>([]);

    const dataTable = useRef<HTMLTableElement>(null);
    const dataTableInstance = useRef<DataTables.Api | null>(null);

    const [updateCategory, setUpdateCategory] = useState<Category>();
    const [deleteCategoryId, setDeleteCategoryId] = useState<number>(-1);

    const reloadPage = () => {
        setDeleteCategoryId(-1);
        loadCategoryData();
    };

    const handleUpdateCategory = (category: Category) => {
        setUpdateCategory(category);
    };

    const handleDeleteCategory = (categoryId: number) => {
        setDeleteCategoryId(categoryId);
    };

    const loadCategoryData = () => {
        setIsLoading(true);
        apiClient
            .get<Category[]>("/list-category")
            .then(({ data: list }) => {
                setCategoryList(list);
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (categoryList && categoryList.length > 0 && dataTable.current) {
            if (dataTableInstance.current) {
                destroyDataTable(dataTableInstance.current);
            }
            dataTableInstance.current = createDataTable(dataTable.current);
        }

        return () => {
            if (dataTableInstance.current) {
                destroyDataTable(dataTableInstance.current);
            }
        };
    }, [categoryList]);

    useEffect(() => {
        loadCategoryData();
    }, []);

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
                                    <h4>Category List</h4>
                                </div>
                                <div className="align-items-center col">
                                    <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#create-modal"
                                        className="float-end btn m-0 bg-primary text-white"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            <hr className="bg-secondary" />
                            <div className="table-responsive">
                                <table
                                    className="table"
                                    id="tableData"
                                    ref={dataTable}
                                >
                                    <thead>
                                        <tr className="bg-light">
                                            <th>No</th>
                                            <th>Category</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tableList">
                                        {categoryList.map((category, index) => (
                                            <tr
                                                key={category.id}
                                                className={
                                                    index % 2 === 0
                                                        ? "even"
                                                        : "odd"
                                                }
                                            >
                                                <td className="sorting_1">
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <span className="h6">
                                                        {category.name}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#update-modal"
                                                        type="button"
                                                        className="btn editBtn btn-sm btn-outline-success mx-1"
                                                        onClick={() =>
                                                            handleUpdateCategory(
                                                                category
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
                                                            handleDeleteCategory(
                                                                category.id
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

            <CreateCategoryModal reloadPage={reloadPage} />
            <UpdateCategoryModal
                reloadPage={reloadPage}
                category={updateCategory}
            />
            <DeleteCategoryModal
                reloadPage={reloadPage}
                categoryId={deleteCategoryId}
            />
        </div>
    );
};

export default Category;
