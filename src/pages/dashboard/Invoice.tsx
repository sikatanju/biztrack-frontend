import { useEffect, useRef, useState } from "react";
import apiClient from "../../utils/apiClient";
import { Customer } from "./Customer";
import {
    createCustomDataTable,
    destroyDataTable,
} from "../../utils/createDataTable";
import { Link } from "react-router";
import ViewInvoiceModal from "../../components/modals/invoice/ViewInvoiceModal";
import DeleteInvoiceModal from "../../components/modals/invoice/DeleteInvoiceModal";

export interface Invoice {
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

    const [invoice, setInvoice] = useState<Invoice>();
    const [customer, setCustomer] = useState<Customer>();
    const [deleteInvoiceId, setDeleteInvoiceId] = useState<number>();

    const reloadPage = () => {
        window.location.reload();
    };

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
                                            <td>{invoice.customer.phone}</td>
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
                                                    onClick={() => {
                                                        setCustomer(
                                                            invoice.customer
                                                        );
                                                        setInvoice(invoice);
                                                    }}
                                                >
                                                    <i className="fa text-sm fa-eye"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="deleteBtn btn btn-outline-dark text-sm px-3 py-1 btn-sm m-0"
                                                    data-bs-target=".deleteModal"
                                                    data-bs-toggle="modal"
                                                    onClick={() => {
                                                        setDeleteInvoiceId(
                                                            invoice.id
                                                        );
                                                    }}
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

            <ViewInvoiceModal customer={customer} invoice={invoice} />
            <DeleteInvoiceModal id={deleteInvoiceId} reloadPage={reloadPage} />
        </>
    );
};

export default Invoice;
