import * as React from 'react';
import { connect } from 'react-redux';
import PostForm from '../components/PostForm';
import {ApplicationState} from '../store/index'
import { LoginState } from '../store/interfaces/ILogin';
import { loginActionCreators } from '../store/actions/loginActions';

type MakePostProps =
    LoginState &
    typeof loginActionCreators

class MakePost extends React.PureComponent<MakePostProps> {
  public render() {
    const {isSignedIn} = this.props;
    return (
      // Only render Post component if isSignedIn
      <div>
        {isSignedIn && <PostForm />}
        {!isSignedIn && <div>Sign in to make a post.</div>}
      </div>
    )
  }
};

export default connect(
  (state: ApplicationState) => state.login,
    loginActionCreators
)(MakePost as any);
