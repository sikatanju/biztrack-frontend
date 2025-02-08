/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import { createDataTable, destroyDataTable } from "../../utils/createDataTable";
import UpdateCustomerModal from "../../components/modals/customer/UpdateCustomerModal";
import DeleteCustomerModal from "../../components/modals/customer/DeleteCustomerModal";
import CreateCustomerModal from "../../components/modals/customer/CreateCustomerModal";

export interface Customer {
    id: number;
    name: string;
    email: string;
    mobile: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

const Customer = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [customerList, setCustomerList] = useState<Customer[]>([]);

    const customerDataTableRef = useRef<HTMLTableElement>(null);
    const customerDataTableInstance = useRef<DataTables.Api | null>(null);

    const [updateCustomer, setUpdateCustomer] = useState<Customer>();
    const [deleteCustomerId, setDeleteCustomerId] = useState<number>(-1);

    const handleUpdateCustomer = (customerId: number) => {
        const tempCustomer = customerList.find((cus) => cus.id === customerId);
        if (tempCustomer) setUpdateCustomer(tempCustomer);
    };

    const handleDeleteCustomerId = (customer_id: number) => {
        setDeleteCustomerId(customer_id);
    };

    const fetchCustomerData = () => {
        setIsLoading(true);
        apiClient
            .get<Customer[]>("/list-customer")
            .then(({ data: customers }) => {
                setCustomerList(customers);
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    };

    const reloadPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        fetchCustomerData();
    }, []);

    useEffect(() => {
        if (customerList && customerDataTableRef.current) {
            if (customerDataTableRef.current) {
                destroyDataTable(customerDataTableInstance.current);
            }
            customerDataTableInstance.current = createDataTable(
                customerDataTableRef.current
            );
        }

        return () => {
            destroyDataTable(customerDataTableInstance.current);
        };
    }, [customerList]);

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
                                    <h4>Customer</h4>
                                </div>
                                <div className="align-items-center col">
                                    <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#create-modal"
                                        className="float-end btn m-0 bg-gradient-primary"
                                    >
                                        Create
                                    </button>
                                </div>
                            </div>
                            <hr className="bg-dark " />
                            <table className="table" id="tableData">
                                <thead>
                                    <tr className="bg-light">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="tableList">
                                    {customerList.map((customer, index) => (
                                        <tr
                                            className={
                                                index % 2 === 0 ? "even" : "odd"
                                            }
                                        >
                                            <td>{index + 1}</td>
                                            <td>{customer.name}</td>
                                            <td>{customer.email}</td>
                                            <td>{customer.mobile}</td>
                                            <td>
                                                <button
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#update-modal"
                                                    type="button"
                                                    className="btn editBtn btn-sm btn-outline-success mx-1"
                                                    onClick={() =>
                                                        handleUpdateCustomer(
                                                            customer.id
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
                                                    onClick={() =>
                                                        handleDeleteCustomerId(
                                                            customer.id
                                                        )
                                                    }
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
            <CreateCustomerModal reloadPage={reloadPage} />
            <UpdateCustomerModal
                reloadPage={reloadPage}
                customer={updateCustomer}
            />
            <DeleteCustomerModal
                customer_id={deleteCustomerId}
                realoadPage={reloadPage}
            />
        </div>
    );
};

export default Customer;
