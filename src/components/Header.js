import React from 'react';

import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';

class Header extends React.Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo">Logo</a>
                    <ul className="right hide-on-med-and-down">
                        <li>
                            <a href="sass.html">
                                <i className="material-icons left">search</i>Sign Up</a>
                        </li>
                        <li>
                            <a href="badges.html">
                                <i className="material-icons right">view_module</i>Sign In</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Header;
