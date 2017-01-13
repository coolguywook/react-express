import React from 'react';
import {Link} from 'react-router';

import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/js/init.js';

class SideNav extends React.Component {

    componentDidMount() {}

    render() {
        return (
            <ul id="slide-out" className="side-nav">
                <li>
                    <a href="#!">
                        <i className="material-icons">cloud</i>Welcome!</a>
                </li>
                <li>
                    <a href="#!">Sign Up</a>
                </li>
                <li>
                    <div className="divider"></div>
                </li>
                {/*<li><a className="subheader">Subheader</a></li>*/}
                <li>
                    <Link to="/signin" className="waves-effect">Sign In</Link>
                </li>
            </ul>
        );
    }
}

export default SideNav;
