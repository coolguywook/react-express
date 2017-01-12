import React from 'react';
import {Link} from 'react-router';
import { Translate } from 'react-redux-i18n';

class SigninForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSignin = this.handleSignin.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSignin() {
        let id = this.state.username;
        let pw = this.state.password;

        this.props.onSignin(id, pw).then((success) => {
            if (!success) {
                this.setState({password: ''});
            }
        });
    }

    render() {
        return (
            <div className="container auth">
                <div className="card">
                    <div className="header grey darken-2 white-text center">
                        <div className="card-content"><Translate value="app.signIn"/></div>
                    </div>
                    <div className="card-content">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">perm_identity</i>
                                <input id="username" name="username" type="email" className="validate" value={this.state.username} onChange={this.handleChange}/>
                                <label htmlFor="username" data-error="Incorrect email" data-success="">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock_outline</i>
                                <input id="password" name="password" type="password" className="validate" value={this.state.password} onChange={this.handleChange}/>
                              <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        {/*<a className="waves-effect light-blue darken-2 btn" onClick={this.handleSignin}>SUBMIT</a>*/}
                        <button className="btn waves-effect light-blue darken-2" type="submit" name="action" onClick={this.handleSignin}>Submit
                            <i className="material-icons right">send</i>
                         </button>
                    </div>

                    <div className="footer">
                        <div className="card-content">
                            <div className="right">
                                Not registered?
                                <Link to="/signup"> Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SigninForm.propTypes = {
    onSignin: React.PropTypes.func
}

SigninForm.defaultProps = {
    onSignin: (id, pw) => {
        console.log("Signin function not defined");
    }
}

export default SigninForm;
