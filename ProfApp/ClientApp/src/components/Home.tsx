import * as React from 'react';
import { connect } from 'react-redux';
import Post from './PostForm';
import * as PostStore from '../store/Post';
// import * as PostStore from '../store/Post';
import {ApplicationState} from '../store/index'
import Posts from './Posts';

type HomeProps =
    PostStore.PostState &
    typeof PostStore.actionCreators


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

export default connect(
  (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(Home as any);
