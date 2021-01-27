import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import '../css/login.css'; 
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { LoginState } from '../store/interfaces/ILogin';
import { loginActionCreators } from '../store/actions/loginActions';

type SignUpProps =
    LoginState &
    typeof loginActionCreators

class SignUp extends React.PureComponent<SignUpProps> {
    signUpHandler(e: React.FormEvent) {
      e.preventDefault();
      this.props.signUp()
    }

    render() {
      const {isSignedIn, isFetching} = this.props;
      if (isSignedIn)
            return <Redirect to='/'/>

      if (isFetching) {
        return (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
              <span>Signing In...</span>
            </Spinner>
          </div>
        )
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
                  className="mr-2"
                />
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
          <Link className="btn btn-secondary" to='/signin'>Already Joined? Sign In</Link>
        </div>
      );
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    loginActionCreators
)(SignUp as any);
