/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import { Customer } from "./Customer";
import {
    createCustomDataTable,
    destroyDataTable,
} from "../../utils/createDataTable";
import { Link } from "react-router";
import Sale from "./Sale";

interface Invoice {
    id: number;
    total: string;
    discount: string;
    vat: string;
    payable: string;
    user_id: number;
    customer: Customer;
}

const Invoice = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const invoiceTable = useRef<HTMLTableElement>(null);
    const invoiceTableInstance = useRef<DataTables.Api | null>(null);

    const [invoiceList, setInvoiceList] = useState<Invoice[]>([]);

    const loadInvoice = () => {
        setIsLoading(true);
        apiClient
            .get("/invoice-select")
            .then(({ data: list }) => {
                setInvoiceList(list);
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (invoiceList && invoiceList.length > 0 && invoiceTable.current) {
            if (invoiceTableInstance.current) {
                destroyDataTable(invoiceTableInstance.current);
            }
            invoiceTableInstance.current = createCustomDataTable(
                invoiceTable.current
            );
        }
        return () => {
            if (invoiceTableInstance.current) {
                destroyDataTable(invoiceTableInstance.current);
            }
        };
    }, [invoiceList]);

    useEffect(() => {
        loadInvoice();
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
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 col-sm-12 col-lg-12">
                        <div className="card px-5 py-5">
                            <div className="row justify-content-between ">
                                <div className="align-items-center col">
                                    <h5>Invoices</h5>
                                </div>
                                <div className="align-items-center col">
                                    <Link to={"/sale"}>
                                        <a className="float-end btn m-0 bg-primary text-white">
                                            Create Sale
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <hr className="bg-dark " />
                            <table
                                className="display"
                                id="invoiceTable"
                                aria-describedby="invoiceTable_info"
                                ref={invoiceTable}
                            >
                                <thead>
                                    <tr className="text-bold">
                                        <th>No</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Total</th>
                                        <th>Vat</th>
                                        <th>Discount</th>
                                        <th>Payable</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody id="invoiceList">
                                    {invoiceList.map((invoice, idx) => (
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{invoice.customer.name}</td>
                                            <td>{invoice.customer.mobile}</td>
                                            <td>{invoice.total}</td>
                                            <td>{invoice.vat}</td>
                                            <td>{invoice.discount}</td>
                                            <td>{invoice.payable}</td>
                                            <td className="d-flex flex-row gap-x-px">
                                                <button
                                                    type="button"
                                                    className="viewBtn btn btn-outline-dark text-sm px-3 py-1 btn-sm m-0 mx-1"
                                                    data-bs-target=".details-modal"
                                                    data-bs-toggle="modal"
                                                >
                                                    <i className="fa text-sm fa-eye"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="deleteBtn btn btn-outline-dark text-sm px-3 py-1 btn-sm m-0"
                                                    data-bs-target=".deleteModal"
                                                    data-bs-toggle="modal"
                                                >
                                                    <i className="fa text-sm  fa-trash-alt"></i>
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

            <div
                className="modal animated zoomIn deleteModal"
                id="delete-modal"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <h3 className=" mt-3 text-warning">Delete !</h3>
                            <p className="mb-3">
                                Once delete, you can't get it back.
                            </p>
                            <input className="d-none" id="deleteID" />
                        </div>
                        <div className="modal-footer justify-content-end">
                            <div>
                                <button
                                    type="button"
                                    id="delete-modal-close"
                                    className="btn bg-gradient-success"
                                    data-bs-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {}}
                                    type="button"
                                    id="confirmDelete"
                                    className="btn bg-gradient-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Modal --> */}
            <div
                className="modal animated zoomIn details-modal"
                id="details-modal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                Invoice
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        <div id="invoice" className="modal-body p-3">
                            <div className="container-fluid">
                                <br />
                                <div className="row">
                                    <div className="col-8">
                                        <span className="text-bold text-dark">
                                            BILLED TO{" "}
                                        </span>
                                        <p className="text-xs mx-0 my-1">
                                            Name: <span id="CName">IRS IT</span>{" "}
                                        </p>
                                        <p className="text-xs mx-0 my-1">
                                            Email:{" "}
                                            <span id="CEmail">sdsd@sd.com</span>
                                        </p>
                                        <p className="text-xs mx-0 my-1">
                                            User ID: <span id="CId">1</span>{" "}
                                        </p>
                                    </div>
                                    <div className="col-4">
                                        <img
                                            className="w-40"
                                            src="images/logo.png"
                                        />
                                        <p className="text-bold mx-0 my-1 text-dark">
                                            Invoice{" "}
                                        </p>
                                        <p className="text-xs mx-0 my-1">
                                            Date: 2024-08-20{" "}
                                        </p>
                                    </div>
                                </div>
                                <hr className="mx-0 my-2 p-0 bg-secondary" />
                                <div className="row">
                                    <div className="col-12">
                                        <table
                                            className="table w-100"
                                            id="invoiceTable"
                                        >
                                            <thead className="w-100">
                                                <tr className="text-xs text-bold">
                                                    <td>Name</td>
                                                    <td>Qty</td>
                                                    <td>Total</td>
                                                </tr>
                                            </thead>
                                            <tbody
                                                className="w-100"
                                                id="invoiceList"
                                            >
                                                <tr className="text-xs">
                                                    <td>sd</td>
                                                    <td>7</td>
                                                    <td>364.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <hr className="mx-0 my-2 p-0 bg-secondary" />
                                <div className="row">
                                    <div className="col-12">
                                        <p className="text-bold text-xs my-1 text-dark">
                                            {" "}
                                            TOTAL:{" "}
                                            <i className="bi bi-currency-dollar"></i>{" "}
                                            <span id="total">364</span>
                                        </p>
                                        <p className="text-bold text-xs my-2 text-dark">
                                            {" "}
                                            PAYABLE:{" "}
                                            <i className="bi bi-currency-dollar"></i>{" "}
                                            <span id="payable">382.20</span>
                                        </p>
                                        <p className="text-bold text-xs my-1 text-dark">
                                            {" "}
                                            VAT(5%):{" "}
                                            <i className="bi bi-currency-dollar"></i>{" "}
                                            <span id="vat">18.20</span>
                                        </p>
                                        <p className="text-bold text-xs my-1 text-dark">
                                            {" "}
                                            Discount:{" "}
                                            <i className="bi bi-currency-dollar"></i>{" "}
                                            <span id="discount">0</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn bg-gradient-primary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {}}
                                className="btn bg-gradient-success"
                            >
                                Print
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Invoice;
