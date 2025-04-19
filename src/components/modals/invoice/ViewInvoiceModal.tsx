import { useEffect, useRef, useState } from "react";
import { Customer } from "../../../pages/dashboard/Customer";
import { Invoice } from "../../../pages/dashboard/Invoice";
import apiClient from "../../../utils/apiClient";
import { useReactToPrint } from "react-to-print";

interface Props {
    customer: Customer | undefined;
    invoice: Invoice | undefined;
}

interface SimpleProduct {
    id: number;
    title: string;
    category: 5;
}

interface ProductList {
    product: SimpleProduct;
    quantity: number;
    sale_price: number;
}

const ViewInvoiceModal = ({ customer, invoice }: Props) => {
    const getCurrentDate = () => {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const currentDate = `${day}-${month}-${year}`;

        return currentDate;
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [productList, setProductList] = useState<ProductList[]>([]);

    const contentRef = useRef<HTMLDivElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    useEffect(() => {
        if (invoice)    {
            setIsLoading(true);
            if (invoice?.id)
                apiClient
                    .get(`api/invoices/${invoice?.id}/`)
                    .then((res) => {                        
                        setProductList(res.data.items);
                        setIsLoading(false);
                    })
                    .catch((e) => console.log(e));
        }
    }, [invoice]);

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
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                                        Name:{" "}
                                        <span id="CName">{customer?.name}</span>{" "}
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        Email:{" "}
                                        <span id="CEmail">
                                            {customer?.email}
                                        </span>
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        User ID:{" "}
                                        <span id="CId">{customer?.id}</span>{" "}
                                    </p>
                                </div>
                                <div className="col-4">
                                    <img
                                        className="w-40"
                                        src="images/BizTrack_Logo.png"
                                    />
                                    <p className="text-bold mx-0 my-1 text-dark">
                                        Invoice{" "}
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        Date: {getCurrentDate()}
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
                                                <td>Price</td>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className="w-100"
                                            id="invoiceList"
                                        >
                                            {productList.map((prod) => (
                                                <tr className="text-xs" key={prod.product.id}>
                                                    <td>{prod.product.title}</td>
                                                    <td>{prod.quantity}</td>
                                                    <td>{prod.sale_price}</td>
                                                </tr>
                                            ))}
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
                                        <span id="total">{invoice?.total}</span>
                                    </p>
                                    <p className="text-bold text-xs my-1 text-dark">
                                        {" "}
                                        VAT(5%):{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="vat">{invoice?.vat}</span>
                                    </p>
                                    <p className="text-bold text-xs my-1 text-dark">
                                        {" "}
                                        Discount:{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="discount">
                                            {invoice?.discount}
                                        </span>
                                    </p>
                                    <p className="text-bold text-xs my-2 text-dark">
                                        {" "}
                                        PAYABLE:{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="payable">
                                            {invoice?.payable}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn bg-secondary text-white"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button
                            onClick={() => reactToPrintFn()}
                            className="btn bg-gradient-success"
                        >
                            Print
                        </button>
                    </div>
                </div>
            </div>

            <div className="modal-dialog modal-lg modal-dialog-centered invisible">
                <div className="modal-content" ref={contentRef}>
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
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
                                        Name:{" "}
                                        <span id="CName">{customer?.name}</span>{" "}
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        Email:{" "}
                                        <span id="CEmail">
                                            {customer?.email}
                                        </span>
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        User ID:{" "}
                                        <span id="CId">{customer?.id}</span>{" "}
                                    </p>
                                </div>
                                <div className="col-4">
                                    <img
                                        className="w-40"
                                        src="images/BizTrack_Logo.png"
                                    />
                                    <p className="text-bold mx-0 my-1 text-dark">
                                        Invoice{" "}
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        Date: {getCurrentDate()}
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
                                                <td>Price</td>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className="w-100"
                                            id="invoiceList"
                                        >
                                            {productList.map((prod) => (
                                                <tr className="text-xs" key={prod.product.id}>
                                                    <td>{prod.product.title}</td>
                                                    <td>{prod.quantity}</td>
                                                    <td>{prod.sale_price}</td>
                                                </tr>
                                            ))}
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
                                        <span id="total">{invoice?.total}</span>
                                    </p>
                                    <p className="text-bold text-xs my-1 text-dark">
                                        {" "}
                                        VAT(5%):{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="vat">{invoice?.vat}</span>
                                    </p>
                                    <p className="text-bold text-xs my-1 text-dark">
                                        {" "}
                                        Discount:{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="discount">
                                            {invoice?.discount}
                                        </span>
                                    </p>
                                    <p className="text-bold text-xs my-2 text-dark">
                                        {" "}
                                        PAYABLE:{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="payable">
                                            {invoice?.payable}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewInvoiceModal;
