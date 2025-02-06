import { Link } from "react-router";

const Sidebar = () => {
    return (
        <>
            <Link to="/dashboard" className="side-bar-item">
                <i className="bi bi-graph-up"></i>
                <span className="side-bar-item-caption">Dashboard</span>
            </Link>

            <Link to="/customer" className="side-bar-item">
                <i className="bi bi-people"></i>
                <span className="side-bar-item-caption">Customer</span>
            </Link>

            <Link to="/category" className="side-bar-item">
                <i className="bi bi-list-nested"></i>
                <span className="side-bar-item-caption">Category</span>
            </Link>

            <Link to="/product" className="side-bar-item">
                <i className="bi bi-bag"></i>
                <span className="side-bar-item-caption">Product</span>
            </Link>

            <Link to="/sale" className="side-bar-item">
                <i className="bi bi-currency-dollar"></i>
                <span className="side-bar-item-caption">Create Sale</span>
            </Link>

            <Link to="/invoice" className="side-bar-item">
                <i className="bi bi-receipt"></i>
                <span className="side-bar-item-caption">Invoice</span>
            </Link>

            <Link to="/report" className="side-bar-item">
                <i className="bi bi-file-earmark-bar-graph"></i>
                <span className="side-bar-item-caption">Report</span>
            </Link>
        </>
    );
};

export default Sidebar;
