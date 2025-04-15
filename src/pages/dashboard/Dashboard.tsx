/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from "react";
import apiClient from "../../utils/apiClient";

interface DashboardData {
    product: number;
    category: number;
    customer: number;
    invoice: number;
    total: number;
    vat: number;
    payable: number;
}

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<DashboardData>({
        product: 0,
        category: 0,
        customer: 0,
        invoice: 0,
        total: 0,
        vat: 0,
        payable: 0,
    });
    useEffect(() => {
        setIsLoading(true);
        apiClient.get("api/summary").then((res) => {
            console.log(res.data);
            const {
                product,
                category,
                customer,
                invoice,
                total,
                vat,
                payable,
            } = res.data;
            setData({
                product: product,
                category,
                customer,
                invoice,
                total,
                vat,
                payable,
            });
            setIsLoading(false);
        }).catch(e => console.log(e)
        );
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
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100 bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                <span id="product">
                                                    {data.product}
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Product
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100 bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                <span id="category">
                                                    {data.category}
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Category
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100 bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                <span id="customer">
                                                    {data.customer}
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Customer
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100  bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                <span id="invoice">
                                                    {data.invoice}
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Invoice
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100 bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                ${" "}
                                                <span id="total">
                                                    {data.total}
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Total Sale
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100  bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                ${" "}
                                                <span id="vat">{data.vat}</span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Vat Collection
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 animated fadeIn p-2">
                        <div className="card card-plain h-100  bg-white">
                            <div className="p-3">
                                <div className="row">
                                    <div className="col-9 col-lg-8 col-md-8 col-sm-9">
                                        <div>
                                            <h5 className="mb-0 text-capitalize font-weight-bold">
                                                ${" "}
                                                <span id="payable">
                                                    {data.payable}
                                                </span>
                                            </h5>
                                            <p className="mb-0 text-sm">
                                                Total Collection
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-3 col-lg-4 col-md-4 col-sm-3 text-end">
                                        <div className="icon icon-shape bg-secondary shadow float-end border-radius-md">
                                            <img
                                                className="w-100 "
                                                src="./images/icon.svg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
