import { useEffect, useRef, useState } from "react";
import { Customer } from "../../../pages/dashboard/Customer";
import apiClient from "../../../utils/apiClient";

interface Props {
    customer: Customer | undefined;
    reloadPage: () => void;
}

const UpdateCustomerModal = ({ customer, reloadPage }: Props) => {
    const closeButton = useRef<HTMLButtonElement>(null);
    const [updatedCustomer, setUpdatedCustomer] = useState<
        Customer | undefined
    >(customer);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (updatedCustomer) {
            const { name, value } = e.target;
            setUpdatedCustomer((prev) => ({ ...prev!, [name]: value }));
        }
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        apiClient
            .post("/update-customer", {
                id: updatedCustomer?.id,
                name: updatedCustomer?.name,
                email: updatedCustomer?.email,
                mobile: updatedCustomer?.mobile,
            })
            .then(() => {
                if (closeButton.current) closeButton.current.click();
                reloadPage();
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        setUpdatedCustomer(customer);
    }, [customer]);

    return (
        <div
            className="modal animated zoomIn"
            id="update-modal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Update Customer
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form id="update-form" onSubmit={handleFormSubmit}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">
                                            Customer Name *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerNameUpdate"
                                            name="name"
                                            value={updatedCustomer?.name}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label mt-3">
                                            Customer Email *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerEmailUpdate"
                                            name="email"
                                            value={updatedCustomer?.email}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-label mt-3">
                                            Customer Mobile *
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="customerMobileUpdate"
                                            name="mobile"
                                            value={updatedCustomer?.mobile}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="text"
                                            className="d-none"
                                            id="updateID"
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
                            ref={closeButton}
                        >
                            Close
                        </button>
                        <button
                            id="update-btn"
                            type="submit"
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

export default UpdateCustomerModal;
