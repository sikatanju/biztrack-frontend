import React, { useEffect, useRef, useState } from "react";
import { Customer } from "./Customer";
import apiClient from "../../utils/apiClient";
import {
    createCustomDataTable,
    destroyDataTable,
} from "../../utils/createDataTable";
import { Product } from "./ProductPage";
import { useNavigate } from "react-router";

interface Cart {
    product_id: number;
    qty: number;
    sale_price: string;
    product_name: string;
    subTotal: number;
}
interface ProductInt {
    product_name: string;
    product_id: string;
    qty: string;
    sale_price: string;
}

const Sale = () => {
    const [subtotal, setSubtotal] = useState<number>(0);
    const [vat, setVat] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [payable, setPayable] = useState<number>(0);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [customerList, setCustomerList] = useState<Customer[]>([]);
    const [productList, setProductList] = useState<Product[]>([]);

    const customerTable = useRef<HTMLTableElement>(null);
    const customerTableInstance = useRef<DataTables.Api | null>(null);

    const productTable = useRef<HTMLTableElement>(null);
    const productTableInstance = useRef<DataTables.Api | null>(null);

    const closeBtn = useRef<HTMLButtonElement>(null);

    const [customerName, setCustomerName] = useState<string>("");
    const [customerEmail, setCustomerEmail] = useState<string>("");
    const [customerUserId, setCustomerUserId] = useState<string>("");

    const [productId, setProductId] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<string>("");
    const [productQnt, setProductQnt] = useState<number>();

    const [cart, setCart] = useState<Cart[]>([]);

    const navigate = useNavigate();

    const handleCustomerSelect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const name = target.getAttribute("data-name");
        if (name) setCustomerName(name);
        const email = target.getAttribute("data-email");
        if (email) setCustomerEmail(email);
        const id = target.getAttribute("data-id");
        if (id) setCustomerUserId(id);
    };

    const handleSelectProduct = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const target = e.currentTarget;
        const name = target.getAttribute("data-product-name") || "";
        const price = target.getAttribute("data-product-price") || "";
        const id = target.getAttribute("data-product-id") || "";

        setProductName(name);
        setProductPrice(price);
        setProductId(id);
    };

    const handleProductQnt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductQnt(Number.parseInt(e.target.value));
    };

    const addToCart = () => {
        if (productId && productPrice && productQnt && productName) {
            const temp = parseFloat(
                (productQnt * parseFloat(productPrice)).toFixed(2)
            );
            const newItem = {
                product_id: Number.parseInt(productId),
                qty: productQnt,
                sale_price: productPrice,
                product_name: productName,
                subTotal: temp,
            };
            setCart((prev) => [...prev, newItem]);
            const newPrice = subtotal + temp;
            setSubtotal(parseFloat(newPrice.toFixed(2)));
            if (closeBtn.current) closeBtn.current.click();
        }
    };

    const removeFromCart = (id: number, price: number) => {
        const newCart = cart.filter((pro) => pro.product_id !== id);
        const newPrice = subtotal - price;
        setSubtotal(parseFloat(newPrice.toFixed(2)));
        setCart(newCart);
    };

    const getClassName = (index: number) => {
        return index % 2 == 0 ? "text-xs even" : "text-xs odd";
    };

    const getCurrentDate = () => {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const currentDate = `${day}-${month}-${year}`;

        return currentDate;
    };

    const getSubTotal = (qty: number, price: string) => {
        return parseFloat((Number.parseFloat(price) * qty).toFixed(2));
    };

    const loadCustomer = () => {
        setIsLoading(true);
        apiClient
            .get("/list-customer")
            .then(({ data: list }) => {
                setCustomerList(list);
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    };

    const loadProduct = () => {
        setIsLoading(true);
        apiClient
            .get("/list-product")
            .then(({ data: list }) => {
                setProductList(list);
                setIsLoading(false);
            })
            .catch((e) => console.log(e));
    };

    const handleDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const num = e.target.value;
        setDiscount(parseFloat(parseFloat(num).toFixed(2)));
    };

    const createInvoice = () => {
        const products: ProductInt[] = [];
        cart.forEach((prod) => {
            products.push({
                product_name: prod.product_name,
                product_id: prod.product_id.toString(),
                qty: prod.qty.toString(),
                sale_price: prod.sale_price,
            });
        });

        const payload = {
            customer_id: customerUserId.toString(),
            discount: discount.toString(),
            payable: payable.toString(),
            products: products,
            total: subtotal.toString(),
            vat: vat.toString(),
        };

        apiClient
            .post("/invoice-create", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then(() => {
                navigate("/invoice");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    useEffect(() => {
        const tempVat = parseFloat(((subtotal / 100) * 5).toFixed(2));
        setVat(tempVat);
        setPayable(parseFloat((tempVat + subtotal).toFixed(2)));
    }, [subtotal]);

    useEffect(() => {
        let payable = subtotal + vat;
        if (!Number.isNaN(discount)) {
            payable = payable - discount;
            if (discount > payable) setPayable(0);
            else setPayable(parseFloat(payable.toFixed(2)));
        } else setDiscount(0);
    }, [discount]);

    useEffect(() => {}, [cart]);

    useEffect(() => {
        if (customerList && customerList.length > 0 && customerTable.current) {
            if (customerTableInstance.current) {
                destroyDataTable(customerTableInstance.current);
            }

            customerTableInstance.current = createCustomDataTable(
                customerTable.current
            );
        }

        return () => {
            if (customerTableInstance.current) {
                destroyDataTable(customerTableInstance.current);
            }
        };
    }, [customerList]);

    useEffect(() => {
        if (productList && productList.length > 0 && productTable.current) {
            if (productTableInstance.current) {
                destroyDataTable(productTableInstance.current);
            }
            productTableInstance.current = createCustomDataTable(
                productTable.current
            );
        }
        return () => {
            if (productTableInstance.current) {
                destroyDataTable(productTableInstance.current);
            }
        };
    }, [productList]);

    useEffect(() => {
        loadCustomer();
        loadProduct();
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
                    <div className="col-md-4 col-lg-4 p-2">
                        <div className="shadow-sm h-100 bg-white rounded-3 p-3">
                            <div className="row">
                                <div className="col-8">
                                    <span className="text-bold text-dark">
                                        BILLED TO
                                    </span>
                                    <p className="text-xs mx-0 my-1">
                                        Name:{" "}
                                        <span id="CName">{customerName}</span>{" "}
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        Email:{" "}
                                        <span id="CEmail">{customerEmail}</span>
                                    </p>
                                    <p className="text-xs mx-0 my-1">
                                        User ID:{" "}
                                        <span id="CId">{customerUserId}</span>{" "}
                                    </p>
                                </div>
                                <div className="col-4">
                                    <img
                                        className="w-50"
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
                                        aria-describedby="cartTable_info"
                                        // ref={cartTable}
                                    >
                                        <thead className="w-100">
                                            <tr className="text-xs">
                                                <td>Name</td>
                                                <td>Qty</td>
                                                <td>Total</td>
                                                <td>Remove</td>
                                            </tr>
                                        </thead>
                                        <tbody
                                            className="w-100"
                                            id="invoiceList"
                                        >
                                            {cart.map((prod) => (
                                                <tr className="text-xs">
                                                    <td>{prod.product_name}</td>
                                                    <td>{prod.qty}</td>
                                                    <td>
                                                        {getSubTotal(
                                                            prod.qty,
                                                            prod.sale_price
                                                        )}
                                                    </td>
                                                    <td>
                                                        <a
                                                            data-index="0"
                                                            className="btn remove text-xxs px-2 py-1  btn-sm m-0"
                                                            onClick={() =>
                                                                removeFromCart(
                                                                    prod.product_id,
                                                                    getSubTotal(
                                                                        prod.qty,
                                                                        prod.sale_price
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </a>
                                                    </td>
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
                                        Subtotal:{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="total">{subtotal}</span>
                                    </p>
                                    <p className="text-bold text-xs my-1 text-dark">
                                        {" "}
                                        VAT(5%):{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="vat">{vat}</span>
                                    </p>
                                    <p className="text-bold text-xs my-1 text-dark">
                                        Discount:{" "}
                                        <i className="bi bi-currency-dollar"></i>
                                        <span id="discount">{discount}</span>
                                    </p>
                                    <p className="text-bold text-xs my-2 text-dark">
                                        {" "}
                                        PAYABLE:{" "}
                                        <i className="bi bi-currency-dollar"></i>{" "}
                                        <span id="payable">{payable}</span>
                                    </p>
                                    <span className="text-xxs">
                                        Discount(%):
                                    </span>
                                    {/* <input onkeydown="return false" value="0" min="0" type="number" step="0.25" onchange="DiscountChange()" className="form-control w-40 " id="discountP"> */}
                                    <input
                                        type="number"
                                        value={discount}
                                        className="form-control w-40 "
                                        // id="discountP"
                                        onChange={handleDiscount}
                                    />
                                    <p>
                                        <button
                                            className="btn  my-3 bg-gradient-success w-40 text-white"
                                            onClick={createInvoice}
                                        >
                                            Confirm
                                        </button>
                                        {/* <button onclick="createInvoice()" className="btn  my-3 bg-gradient-primary w-40">Confirm</button> */}
                                    </p>
                                </div>
                                <div className="col-12 p-2"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-lg-4 p-2">
                        <div className="shadow-sm h-100 bg-white rounded-3 p-3">
                            <div
                                id="productTable_wrapper"
                                className="dataTables_wrapper no-footer"
                            >
                                <table
                                    className="display"
                                    id="productTable"
                                    aria-describedby="productTable_info"
                                    ref={productTable}
                                >
                                    <thead className="w-100">
                                        <tr className="text-xs text-bold">
                                            <td
                                                className="sorting sorting_desc"
                                                tabIndex={0}
                                                aria-controls="productTable"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="Product: activate to sort column ascending"
                                                aria-sort="descending"
                                            >
                                                Product
                                            </td>
                                            <td
                                                className="sorting"
                                                tabIndex={0}
                                                aria-controls="productTable"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="Pick: activate to sort column ascending"
                                            >
                                                Pick
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className="w-100" id="productList">
                                        {productList.map((prod, idx) => (
                                            <tr className={getClassName(idx)}>
                                                <td className="sorting_1">
                                                    {prod.title} (${prod.price})
                                                </td>
                                                <td>
                                                    <a
                                                        data-product-name={
                                                            prod.title
                                                        }
                                                        data-product-price={
                                                            prod.price
                                                        }
                                                        data-product-id={
                                                            prod.id
                                                        }
                                                        className="btn btn-outline-dark text-xxs px-2 py-1 addProduct  btn-sm m-0"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#create-modal"
                                                        onClick={(e) =>
                                                            handleSelectProduct(
                                                                e
                                                            )
                                                        }
                                                    >
                                                        Add
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 col-lg-4 p-2">
                        <div className="shadow-sm h-100 bg-white rounded-3 p-3">
                            <div
                                id="customerTable_wrapper"
                                className="dataTables_wrapper no-footer"
                            >
                                <table
                                    className="display"
                                    id="customerTable"
                                    aria-describedby="customerTable_info"
                                    ref={customerTable}
                                >
                                    <thead className="w-100">
                                        <tr className="text-xs text-bold">
                                            <td
                                                className="sorting sorting_desc"
                                                tabIndex={0}
                                                aria-controls="customerTable"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="Customer: activate to sort column ascending"
                                                aria-sort="descending"
                                            >
                                                Customer
                                            </td>
                                            <td
                                                className="sorting"
                                                tabIndex={0}
                                                aria-controls="customerTable"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-label="Pick: activate to sort column ascending"
                                            >
                                                Pick
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className="w-100" id="customerList">
                                        {customerList.map((cus, idx) => (
                                            <tr className={getClassName(idx)}>
                                                <td className="sorting_1">
                                                    <i className="bi bi-person"></i>
                                                    {cus.name}
                                                </td>
                                                <td>
                                                    <a
                                                        data-name={cus.name}
                                                        data-email={cus.email}
                                                        data-id={cus.id}
                                                        className="btn btn-outline-dark addCustomer  text-xxs px-2 py-1  btn-sm m-0"
                                                        onClick={(e) =>
                                                            handleCustomerSelect(
                                                                e
                                                            )
                                                        }
                                                    >
                                                        Select
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div
                        className="modal animated zoomIn"
                        id="create-modal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                    >
                        <div className="modal-dialog modal-md modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h6
                                        className="modal-title"
                                        id="exampleModalLabel"
                                    >
                                        Add Product
                                    </h6>
                                </div>
                                <div className="modal-body">
                                    <form id="add-form">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-12 p-1">
                                                    <label className="form-label">
                                                        Product ID *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="PId"
                                                        value={productId}
                                                        readOnly
                                                    />
                                                    <label className="form-label mt-2">
                                                        Product Name *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="PName"
                                                        value={productName}
                                                        readOnly
                                                    />
                                                    <label className="form-label mt-2">
                                                        Product Price *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="PPrice"
                                                        value={productPrice}
                                                        readOnly
                                                    />
                                                    <label className="form-label mt-2">
                                                        Product Qty *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="PQty"
                                                        value={productQnt}
                                                        onChange={(e) =>
                                                            handleProductQnt(e)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        id="modal-close"
                                        className="btn bg-gradient-primary"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        ref={closeBtn}
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={addToCart}
                                        id="save-btn"
                                        className="btn bg-gradient-success"
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sale;
