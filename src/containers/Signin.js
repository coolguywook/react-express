import React from 'react';
import { SigninForm } from 'components';
import { connect } from 'react-redux';
import { requestSignin } from 'actions/signin';
import { browserHistory } from 'react-router';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.handleSignin = this.handleSignin.bind(this);
  }

  handleSignin(id, pw) {
    return this.props.requestSignin(id, pw).then(
        () => {
          if(this.props.status === "SUCCESS") {
            let signinData = {
              isLoggedIn: true,
              username: id
            };

            document.cookie = 'key=' + btoa(JSON.stringify(signinData));

            Materialize.toast('Welcome ' + id + '!', 2000, 'rounded');
            browserHistory.push('/');
            return true;
          } else {
            let $toastContent = '<span style="color: #FFB4BA">Incorrect username or password</span>';
            Materialize.toast($toastContent, 5000, 'rounded');
            return false;
          }
        }
    );
  }

  render() {
    return (
      <div>
        <SigninForm onSignin={this.handleSignin}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authentication.signin.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestSignin: (id, pw) => {
      return dispatch(requestSignin(id, pw));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
