import React from 'react';

const styles = {
  container: {
      marginTop: '50px',
      textAlign: 'center'
  },
  header: {
    fontSize: '18px'
  },
  btn: {
    width: '90%'
  }
};

class SignupForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
          firstname: "",
          lastname: "",
          phone: "",
          username: "",
          password: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSignUp = this.handleSignUp.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSignUp(e) {
      e.preventDefault();

      let firstname = this.state.firstname;
      let lastname = this.state.lastname;
      let phone = this.state.phone;
      let username = this.state.username;
      let password = this.state.password;
      let data = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        username: username,
        password:password
      };

      this.props.onSignUp(data).then((success) => {
          if (!success) {
              this.setState({password: ''});
          }
      });
    }

    render() {
        return (
            <div className="container" style={styles.container}>
              <form className="col s12" onSubmit={this.handleSignUp}>
                <div className="card">
                  <div className="header cyan darken-4 white-text center" style={styles.header}>
                      <div className="card-content">SIGN UP</div>
                  </div>
                  <div className="card-content">
                      <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="firstname" name="firstname" type="text" className="validate"
                              onChange={this.handleChange}/>
                            <label htmlFor="first_name">First Name</label>
                          </div>
                          <div className="input-field col s6">
                            <input id="lastname" name="lastname" type="text" className="validate"
                            onChange={this.handleChange}/>
                            <label htmlFor="last_name">Last Name</label>
                          </div>
                      </div>
                      <div className="row">
                        <div className="input-field col s12">
                           <i className="material-icons prefix">phone</i>
                          <input id="phone" name="phone" type="text" className="validate"
                          onChange={this.handleChange}/>
                          <label htmlFor="phone">Phone</label>
                        </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <i className="material-icons prefix">perm_identity</i>
                              <input id="username" name="username" type="email" className="validate"
                              onChange={this.handleChange}/>
                              <label htmlFor="username" data-error="Incorrect email" data-success="">Email</label>
                          </div>
                      </div>
                      <div className="row">
                          <div className="input-field col s12">
                              <i className="material-icons prefix">lock_outline</i>
                              <input id="password" name="password" type="password" className="validate"
                              onChange={this.handleChange}/>
                            <label htmlFor="password">Password</label>
                          </div>
                      </div>
                      {/*<a className="waves-effect light-blue darken-2 btn" onClick={this.handleSignin}>SUBMIT</a>*/}
                      <button className="btn-large waves-effect light-blue darken-2" style={styles.btn} type="submit" name="action">Submit
                          <i className="material-icons right">send</i>
                       </button>
                  </div>
                </div>
              </form>
            </div>
        );
    }
}

SignupForm.PropTypes = {
  onSignUp: React.PropTypes.func
}

SignupForm.defaultProps = {
  onSignUp: (data) => {
      console.log("Signup function not defined");
  }

}

export default SignupForm;
