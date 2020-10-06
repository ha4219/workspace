import React from 'react';
import { Link } from 'react-router-dom';


const Navigation = ({userObj}) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/profile">sadfsad{userObj.displayName} Profile</Link>
                </li>
                <li>
                    <Link to="/editProfile">editProfile</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;