import { Link } from "react-router";

const Sidebar = () => {
    return (
        <div id="sideNavRef" className="side-nav-open">
            <Link to="/dashboard">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-graph-up"></i>
                    <span className="side-bar-item-caption">Dashboard</span>
                </a>
            </Link>

            <Link to="#">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-people"></i>
                    <span className="side-bar-item-caption">Customer</span>
                </a>
            </Link>

            <Link to="/category">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-list-nested"></i>
                    <span className="side-bar-item-caption">Category</span>
                </a>
            </Link>

            <Link to="#">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-bag"></i>
                    <span className="side-bar-item-caption">Product</span>
                </a>
            </Link>

            <Link to="#">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-currency-dollar"></i>
                    <span className="side-bar-item-caption">Create Sale</span>
                </a>
            </Link>

            <Link to="#">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-receipt"></i>
                    <span className="side-bar-item-caption">Invoice</span>
                </a>
            </Link>

            <Link to="#">
                <a href="#" className="side-bar-item">
                    <i className="bi bi-file-earmark-bar-graph"></i>
                    <span className="side-bar-item-caption">Report</span>
                </a>
            </Link>
        </div>
    );
};

export default Sidebar;
