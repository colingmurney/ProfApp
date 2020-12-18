import * as React from 'react';
import { connect } from 'react-redux';
import Post from './Post';
import * as LoginStore from '../store/Login';
// import * as PostStore from '../store/Post';
import {ApplicationState} from '../store/index'

type HomeProps =
    LoginStore.LoginState &
    typeof LoginStore.actionCreators


class Home extends React.PureComponent<HomeProps> {
  
  public render() {
    return (
      <div>
        {/* Only render Post component if isSignedIn */}
        {this.props.isSignedIn && <Post />}
      </div>
    )
  }
};

export default connect(
  (state: ApplicationState) => state.login,
    LoginStore.actionCreators
)(Home as any);
