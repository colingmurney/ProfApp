import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import '../css/login.css'; 
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { LoginState } from '../store/interfaces/ILogin';
import { loginActionCreators } from '../store/actions/loginActions';

type SignInProps =
    LoginState &
    typeof loginActionCreators

class SignIn extends React.PureComponent<SignInProps> {
    
  signInHandler(e: React.FormEvent) {
    e.preventDefault();
    this.props.signIn()
  }
  
  public render() {
    
    const {isSignedIn, isFetching, incorrectCredentials} = this.props;
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
          <form className="form-signin" onSubmit={(e) => this.signInHandler(e)} autoComplete="off" >
          {incorrectCredentials &&
            <div className="d-flex justify-content-center">
              <div className="alert alert-danger" role="alert">
                  Incorrect email or password.
              </div>
            </div>
          }
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <input
              type="email"
              className="form-control mb-1"
              placeholder="Email address"
              onChange={(e) => this.props.changeEmail(e)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) => this.props.changePassword(e)}
              required
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
              Sign in
            </button>
          </form>
          <Link className="btn btn-secondary" to='/signup'>Make an Account</Link>
        </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    loginActionCreators
)(SignIn as any);
