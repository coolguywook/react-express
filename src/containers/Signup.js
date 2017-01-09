import React from 'react';
import { SignupForm } from 'components';
import { connect } from 'react-redux';
import { requestSignup } from 'actions/signup';
import { browserHistory } from 'react-router';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignUp(data) {
    return this.props.requestSignup(data).then(
      () => {
        if(this.props.status === "SUCCESS") {
          Materialize.toast('Success! Please log in.', 4000);
          browserHistory.push('/signin');
          return true;
        } else {
          let errorMessage = [
            'Invalid Username',
            'Password is too short',
            'Username already exists'
          ];

          let $toastContent = '<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>';
          Materialize.toast($toastContent, 5000, 'rounded');
          return false;
        }
      }
    );
  }

  render() {
    return (
      <div>
        <SignupForm onSignUp={this.handleSignUp}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.signupReducer.signup.status,
    errorCode: state.signupReducer.signup.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestSignup: (data) => {
      return dispatch(requestSignup(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
