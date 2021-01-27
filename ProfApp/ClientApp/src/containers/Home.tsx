import * as React from 'react';
import { connect } from 'react-redux';
import {ApplicationState} from '../store/index'
import { PostState } from '../store/interfaces/IPost';
import { postActionCreators } from '../store/actions/postActions';
import { LoginState } from '../store/interfaces/ILogin';
import Post from '../components/Post';

type HomeProps =
    PostState &
    LoginState &
    typeof postActionCreators

class Home extends React.PureComponent<HomeProps> {
  componentDidMount() {
    // load posts to state
    this.props.fetchPosts()
  }

  public render() {
    const { posts } = this.props;
    const postComponents: JSX.Element[] = [];
    if (posts && posts[0]) {
    this.props.posts.map((post, index) => {
      const { upvotePost, downvotePost, removeVote, isSignedIn } = this.props;
      return postComponents.push(
        <Post
        key={index}
        post={post}
        upvotePost={upvotePost}
        downvotePost={downvotePost}
        removeVote={removeVote}
        isSignedIn={isSignedIn} 
        />
      )
    })
  }
    
    return (
      // if posts have been loaded, load posts component
      <div>
      { postComponents }
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

export default connect(
  mapStateToProps,
  postActionCreators,
)(Home as any)
