/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import apiClient from "../../../utils/apiClient";

interface NewCustomer {
    name: string;
    email: string;
    mobile: string;
}

interface Props {
    reloadPage: () => void;
}

const CreateCustomerModal = ({ reloadPage }: Props) => {
    const closeButton = useRef<HTMLButtonElement>(null);
    const [customer, setCustomer] = useState<NewCustomer>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCustomer((prev) => ({ ...prev!, [name]: value }));
    };

    const handleNewCustomer = () => {
        console.log(customer);

        if (customer) {
            apiClient
                .post("/create-customer", customer)
                .then((res) => {
                    if (closeButton.current) closeButton.current.click();
                    reloadPage();
                })
                .catch((e) => console.log(e));
        }
    };

    return (
        <div
            className="modal animated zoomIn"
            id="create-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Create Customer
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form id="save-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">
                                            Customer Name *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerName"
                                            name="name"
                                            value={customer?.name}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label">
                                            Customer Email *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerEmail"
                                            name="email"
                                            value={customer?.email}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label">
                                            Customer Mobile *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerMobile"
                                            name="mobile"
                                            value={customer?.mobile}
                                            onChange={handleInputChange}
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
                            ref={closeButton}
                        >
                            Close
                        </button>
                        <button
                            id="save-btn"
                            className="btn bg-gradient-success"
                            onClick={handleNewCustomer}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomerModal;
