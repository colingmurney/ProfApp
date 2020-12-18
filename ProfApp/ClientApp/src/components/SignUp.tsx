import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import '../css/Login.css'; 
import { Redirect } from 'react-router';

type SignUpProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators

class SignUp extends React.PureComponent<SignUpProps> {
    signUpHandler(e: React.FormEvent) {
      e.preventDefault();
      this.props.signUp()
    }

    render() {
      const {isSignUpPage, isSignedIn} = this.props;
      if (isSignedIn)
            return <Redirect to='/'/>

      if (!isSignUpPage) {
        return <Redirect to="/signin" />
      }


        return (
          <div className="login">
            <h1 className="mt-5 mb-5">RecLeague</h1>
            <form className="form-signin" onSubmit={(e) => this.signUpHandler(e)} autoComplete="off">
              <h1 className="h3 mb-3 font-weight-normal">Create an account</h1>
              <input
                type="text"
                className="form-control mb-1"
                placeholder="First Name"
                required
                onChange={(e) => this.props.changeFirstName(e)}
              />
              <input
                type="text"
                className="form-control mb-1"
                placeholder="Last Name"
                required
                onChange={(e) => this.props.changeLastName(e)}
              />
              <input
                type="email"
                className="form-control mb-1"
                placeholder="Email address"
                required
                onChange={(e) => this.props.changeEmail(e)}
              />
              <input
                type="password"
                className="form-control mb-1"
                placeholder="Create password"
                required
                onChange={(e) => this.props.changePassword(e)}
              />
              <input
                type="password"
                className="form-control mb-3"
                placeholder="Confirm password"
                required
                onChange={(e) => this.props.changeConfirmPassword(e)}
              />
              <div className="checkbox mb-2">
                <label>
                  <input
                    onClick={() => this.props.toggleRememberMe()}
                    type="checkbox"
                    value="remember-me"
                  />{" "}
                  Remember me
                </label>
              </div>
              <button
                className="btn btn-lg btn-primary btn-block mb-2"
                type="submit"
              >
                Become a member
              </button>
            </form>
            <button onClick={() => this.props.toggleView()}>
                Already joined? Sign In
            </button>
          </div>
        );
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(SignUp as any);
