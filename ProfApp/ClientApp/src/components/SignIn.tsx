import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import '../css/Login.css'; 
import { Redirect } from 'react-router';

type SignInProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators

class SignIn extends React.PureComponent<SignInProps> {
    
  signInHandler(e: React.FormEvent) {
    e.preventDefault();
    this.props.signIn()
  }

  // redirectSignUp() {
  //   return <Redirect to="/signup"/>
  // }
  
  public render() {
    
    const {isSignUpPage, isSignedIn} = this.props;
    if (isSignedIn)
          return <Redirect to='/'/>
    if (isSignUpPage) {
      return <Redirect to='/signup'/>
    }
    return (
        <div className="login">
          <h1 className="mt-5 mb-5">RecLeague</h1>
          <form className="form-signin" onSubmit={(e) => this.signInHandler(e)} autoComplete="off" >
          {/* onSubmit={(e) => this.signInHandler(e)} */}
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
                />{" "}
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
          <button onClick={() => this.props.toggleView()}> 
              Make an Account
            </button>
            {/* <button onClick={() => this.redirectSignUp()}> 
              Make an Account
            </button> */}
        </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(SignIn as any);
