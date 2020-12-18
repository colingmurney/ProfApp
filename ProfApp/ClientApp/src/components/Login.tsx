import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/Login';
import SignIn from './SignIn';
import SignUp from './SignUp';

export type LoginProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators &
    RouteComponentProps<{}>;

class Login extends React.PureComponent<LoginProps> {
    public render() {
        const {signUp, isSignedIn} = this.props;
        if (isSignedIn)
            return <Redirect to='/'/>
        
        return (
            <div>
                {signUp && <SignUp />}
                {!signUp && <SignIn />}
            </div>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(Login as any);
