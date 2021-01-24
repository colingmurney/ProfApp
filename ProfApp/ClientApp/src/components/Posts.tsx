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

    handleUpvote(postId: number, currentVoteStatus: number) {
        if (currentVoteStatus === PostStore.VoteStatus.upvote) {
            this.props.removeVote(postId, currentVoteStatus);
        } else {
            this.props.upvotePost(postId, currentVoteStatus)
        }
    }

    handleDownvote(postId: number, currentVoteStatus: number) {
        if (currentVoteStatus === PostStore.VoteStatus.downvote) {
            this.props.removeVote(postId, currentVoteStatus);
        } else {
            this.props.downvotePost(postId, currentVoteStatus)
        }
    }

    public render() {
        const { isSignedIn } = this.props;
        const posts: any[] = [];

        this.props.posts.map((post, index) => {

            const {date, course, body, header, postId, attachment, imageSrc, currentVoteStatus, totalVotes} = post;

            return posts.push(
                
                <div className="jumbotron p-3 pb-1" key={index}>
                    <div className="row">
                        <div className="col-1">
                        
                        <div>
                            <button onClick={() =>
                            this.handleUpvote(postId, currentVoteStatus)} 
                            className={currentVoteStatus === PostStore.VoteStatus.upvote ? "btn-success" : ""}
                            disabled={!isSignedIn ? true : false}>
                                Upvote
                            </button>
                        </div>
                        <div>
                            <button onClick={() =>
                            this.handleDownvote(postId, currentVoteStatus)}                            
                            className={currentVoteStatus === PostStore.VoteStatus.downvote ? "btn-success" : ""}
                            disabled={!isSignedIn ? true : false}>
                                Downvote
                            </button>
                        </div>

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