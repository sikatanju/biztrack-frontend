import { useState } from "react";
import apiClient from "../../utils/apiClient";

const Report = () => {
    const [fromDate, setFromDate] = useState<string>();
    const [toDate, setToDate] = useState<string>();
    const [error, setError] = useState<boolean>(false);

    const handleFromDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFromDate(e.target.value);
        if (toDate) setError(false);
    };

    const handleToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setToDate(e.target.value);
        if (fromDate) setError(false);
    };

    const getSalesReport = () => {
        if (!fromDate || !toDate) {
            setError(true);
            return;
        }
        apiClient
            .get(`sales-report/${fromDate}/${toDate}`, { responseType: "blob" })
            .then((res) => {
                console.log(res);
                const blob = new Blob([res.data], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);

                window.open(url, "_blank");
                const a = document.createElement("a");
                a.href = url;
                a.download = "sales-report.pdf";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch((e) => console.log(e));
    };

    return (
        <div id="contentRef" className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h4>Sales Report</h4>
                                <label className="form-label mt-2">
                                    From Date
                                </label>
                                <input
                                    id="FormDate"
                                    type="date"
                                    className="form-control"
                                    value={fromDate}
                                    onChange={handleFromDate}
                                />
                                <label className="form-label mt-2">
                                    To Date
                                </label>
                                <input
                                    id="ToDate"
                                    type="date"
                                    className="form-control"
                                    value={toDate}
                                    onChange={handleToDate}
                                />
                                {error && (
                                    <p className="text-danger mt-4 mb-0">
                                        Select both "From Date" and "To Date"
                                    </p>
                                )}
                                <button
                                    onClick={() => getSalesReport()}
                                    className="btn mt-3 bg-gradient-secondary"
                                >
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
