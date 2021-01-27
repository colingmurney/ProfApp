import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import '../css/home.css';
import { RouteComponentProps } from 'react-router';
import { PostState } from '../store/interfaces/IPost';
import { postActionCreators } from '../store/actions/postActions';
import { LoginState } from '../store/interfaces/ILogin';
import Post from '../components/Post';

type PostProps = PostState &
    LoginState &
    typeof postActionCreators &
    RouteComponentProps<{postId: string}>

class PostContainer extends React.Component<PostProps> {
    componentDidMount() {
       this.fetchPostUsingUrlParam();
    }

    componentDidUpdate(prevProps: any) {
        const locationChanged = this.props.location !== prevProps.location;
        if (locationChanged) {
            this.fetchPostUsingUrlParam()
        }
    }

    fetchPostUsingUrlParam(){
        const postId = parseInt(this.props.match.params.postId);
        this.props.fetchPostById(postId);
    }

    public render() {
        const { posts, upvotePost, downvotePost, removeVote, isSignedIn } = this.props;
        if (posts) {

            return (
                <div>
                    <Post
                        post={posts[0]}
                        upvotePost={upvotePost}
                        downvotePost={downvotePost}
                        removeVote={removeVote}
                        isSignedIn={isSignedIn} 
                    />
                    Put attachment preview here
                </div>
            )
        }

        return "Loading post"
    }
}

const mapStateToProps = (state: ApplicationState) => {
    return {
       ...state.post,
       ...state.login
    };
  };
  
  export default connect(
    mapStateToProps,
    postActionCreators
)(PostContainer as any)