import * as React from 'react';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import * as LoginStore from '../store/Login';
// import * as PostStore from '../store/Post';
import {ApplicationState} from '../store/index'


type MakePostProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators


class MakePost extends React.PureComponent<MakePostProps> {
  
    
  public render() {
    const {isSignedIn} = this.props;
    return (
      <div>
        {/* Only render Post component if isSignedIn */}
        {isSignedIn && <PostForm />}
        {!isSignedIn && <div>Sign in to make a post.</div>}
      </div>
    )
  }
};

export default connect(
  (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(MakePost as any);
