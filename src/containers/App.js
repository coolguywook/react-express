import React from 'react';
import {Header, SideNav} from 'components';
import {connect} from 'react-redux';
import {getStatusRequest} from 'actions/status';
import {requestSignout} from 'actions/signout';

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.handleSignout = this.handleSignout.bind(this);
    }

    componentDidMount() {
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if(parts.length == 2) return parts.pop().split(";").shift();
        }

        let loginData = getCookie("key");

        if(typeof loginData === "undefined") return;

        loginData = JSON.parse(atob(loginData));

        if(!loginData.isLoggedIn) return;

        this.props.getStatusRequest().then(
            () => {
                console.log(this.props.status);

                if(!this.props.status.valid) {
                    loginData = {
                        isLoggedIn: false,
                        username: ''
                    };

                    document.cookie = 'key=' + btoa(JSON.stringify(loginData));

                    let $toastContent = '<span style="color: #FFB4BA">Your session is expired, please, Sign in again</span>';
                    Materialize.toast($toastContent, 5000, 'rounded');
                }
            }
        );
    }

    handleSignout() {
        this.props.requestSignout().then(
            () => {
                Materialize.toast('Good bye!', 2000);

                let loginData = {
                    isLoggedIn: false,
                    username: ''
                };

                document.cookie = 'key=' + btoa(JSON.stringify(loginData));
            }
        );
    }

    render() {
        //let re = /(signin|signup)/;
        //let isAuth = re.test(this.props.location.pathname);
        let isAuth = false;

        return (
            <div>
                {isAuth
                    ? undefined
                    : <div>
                        <Header isLoggedIn={this.props.status.isLoggedIn} onLogout={this.handleSignout}/>
                        <SideNav />
                      </div>}
                {this.props.children}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.authentication.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        requestSignout: () => {
            return dispatch(requestSignout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
