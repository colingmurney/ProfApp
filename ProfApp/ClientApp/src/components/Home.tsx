import * as React from 'react';
import { connect } from 'react-redux';
import Post from './PostForm';
import * as PostStore from '../store/Post';
import * as LoginStore from '../store/Login';
import {ApplicationState} from '../store/index'
import Posts from './Posts';

export type HomeProps =
    PostStore.PostState &
    typeof PostStore.actionCreators &
    LoginStore.LoginState &
    typeof LoginStore.actionCreators


class Home extends React.PureComponent<HomeProps> {
  componentDidMount() {
    this.props.fetchPosts() 
  }

  public render() {
    const {posts} = this.props

    return (
      <div>
        {posts && posts[0] && <Posts/>}
      </div>
    )
  }
};

const mapStateToProps = (state: ApplicationState) => {
  return {  
     ...state.post,
     ...state.login
  };
};

// const mapDispatchToProps = (dispatch: any ) => {
//   return {
//     fetchPosts: () => {
//       dispatch(PostStore.actionCreators.fetchPosts())
//     }
//   };
// }

export default connect(
  mapStateToProps,
  {
    ...PostStore.actionCreators,
    ...LoginStore.actionCreators
  }
)(Home as any)
