import React from 'react';
import {Link} from 'react-router';
import {Translate} from 'react-redux-i18n';
import {Search} from 'components';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/js/init.js';

const styles = {
    logo: {
        marginLeft: '10px'
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);

        // IMPLEMENT: CREATE A SEARCH STATUS

        this.state = {
            search: false
        };

        this.toggleSearch = this.toggleSearch.bind(this);
    }

    toggleSearch() {
        this.setState({
            search: !this.state.search
        });
    }
    componentDidMount() {
        //$('.button-collapse').sideNav({'edge': 'left'});
    }

    render() {

        const signinButton = (
            <li>
                <Link to="/signin">
                    <i className="material-icons left">lock_open</i><Translate value="app.signIn"/></Link>
            </li>
        );

        const signoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons left">lock</i><Translate value="app.signOut"/></a>
            </li>
        );

        const signupButton = (
            <li>
                <Link to="/signup">
                    <i className="material-icons left">vpn_key</i><Translate value="app.signUp"/></Link>
            </li>
        );

        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a href="#" data-activates="slide-out" className="button-collapse">
                            <i className="material-icons">menu</i>
                        </a>
                        <Link to="/" className="brand-logo" style={styles.logo}><Translate value="app.title"/></Link>
                        <ul className="right">
                            <li><a onClick={this.toggleSearch}><i className="material-icons">search</i></a></li>
                        </ul>
                        <ul className="right hide-on-med-and-down">
                            {signupButton}
                            {this.props.isLoggedIn
                                ? signoutButton
                                : signinButton}
                        </ul>
                    </div>
                </nav>
                <ReactCSSTransitionGroup transitionName="search" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {/* IMPLEMENT: SHOW SEARCH WHEN SEARCH STATUS IS TRUE */}
                    {this.state.search ? <Search onClose={this.toggleSearch}
                       onSearch={this.props.onSearch}
                       usernames={this.props.usernames}/> : undefined }
                </ReactCSSTransitionGroup>
            </div>

        );
    }
}

Header.PropTypes = {
    isLoggedIn: React.PropTypes.bool,
    onLogout: React.PropTypes.func,
    usernames: React.PropTypes.array
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => {
        console.error("logout function not defined");
    },
    usernames: []
};

export default Header;
