import React from 'react';
import { Link } from 'react-router';

import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'materialize-css/js/init.js';

const styles = {
  logo: {
    marginLeft: '10px',
  },
};

class Header extends React.Component {

    componentDidMount() {
      //$('.button-collapse').sideNav({'edge': 'left'});
    }

    render() {

        const signinButton = (
          <li>
              <Link to="/signin">
                  <i className="material-icons right">lock_open</i>Sign In</Link>
          </li>
        );

        const signoutButton = (
          <li>
              <a onClick={this.props.onLogout}>
                  <i className="material-icons right">lock</i>Sign Out</a>
          </li>
        );

        const signupButton = (
            <li>
                <Link to="/signup">
                    <i className="material-icons left">vpn_key</i>Sign Up</Link>
            </li>
        );

        return (
            <nav>
                <div className="nav-wrapper">
                    <a href="#" data-activates="slide-out" className="button-collapse"><i className="material-icons">menu</i></a>
                    <Link to="/" className="brand-logo" style={styles.logo}>Logo</Link>
                    <ul className="right hide-on-med-and-down">
                      { signupButton }
                      { this.props.isLoggedIn ? signoutButton : signinButton }
                    </ul>
                </div>
            </nav>
        );
    }
}

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool,
  onLogout: React.PropTypes.func
};

Header.defaultProps = {
  isLoggedIn: false,
  onLogout: () => { console.error("logout function not defined"); }
};

export default Header;
