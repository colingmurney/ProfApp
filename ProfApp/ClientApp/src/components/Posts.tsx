import React, { FormEvent } from 'react';
import {PostProps} from './PostForm';
import {HomeProps} from './Home';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as PostStore from '../store/Post';
import '../css/home.css';
import formatDate from '../utils/formatDate';
import { Link } from 'react-router-dom';

class Posts extends React.Component<HomeProps> {
    componentDidMount() {
        this.props.resetSearchPreview()
    }
    //Dynamically make components for posts, eventually make pagination to load more posts
    public render() {
        const { isSignedIn } = this.props;
        const posts: any[] = [];

        this.props.posts.map((post, index) => {

            const {date, course, body, header, postId, attachment, imageSrc, currentVoteStatus, totalVotes} = post;

            return posts.push(
                
                <div className="jumbotron p-3 pb-1" key={index}>
                    <div className="row">
                        <div className="col-1">
                        {/* Up and down icons for voting on a post.
                        Disabled if no user is not signed in.
                        Highlights option previously selected by user*/}
                        
                        <div><button onClick={() => this.props.votePost('upvote', index)} disabled={currentVoteStatus === 1 || !isSignedIn ? true : false}>Upvote</button></div>
                        <div><button onClick={() => this.props.votePost('downvote', index)} disabled={currentVoteStatus === 0 || !isSignedIn ? true : false}>Downvote</button></div>      
                        <div>{totalVotes}</div>

                        </div>
                        <div className="col-10">              
                            <Link to={`/post/${postId}`}> {<h1>{header}</h1>}</Link> 
                            <p><b>Course: </b>{course}</p>
                            <p><b>Attachment: </b><a href={imageSrc} target="_blank">{attachment}</a></p>
                            <div className="post-body">
                                <p>{body}</p>
                            </div>
                            <p className="date">{formatDate(date)}</p>
                        </div>
                    </div>
                </div>
            )
        })

        return (posts)
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
    PostStore.actionCreators
)(Posts as any)