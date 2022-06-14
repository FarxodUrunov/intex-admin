import { Link } from "react-router-dom"

import './Missing.css';
const Missing = () => {
    return (
        <article style={{ padding: "100px", width: '400px', margin: '0 auto',}}>
            <h1 className="missingh1">Oops!</h1>
            <p className="missingp">Page Not Found</p>
            <div className="flexGrow">
                <Link to="login" className="link">Visit Login Page</Link>
            </div>
        </article>
    )
}

export default Missing
