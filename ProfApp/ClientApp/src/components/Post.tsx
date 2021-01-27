import React from 'react';
import { IPost, VoteStatus, IVoteFunction } from '../store/interfaces/IPost';
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

interface PostProps {
    post: IPost;
    upvotePost: IVoteFunction;
    downvotePost: IVoteFunction;
    removeVote: IVoteFunction;
    isSignedIn: boolean;
};

const Post: React.FunctionComponent<PostProps> = (props: PostProps) => {

    const handleUpvote = (postId: number, currentVoteStatus: number) => {
        console.log("handleUpvote");
        if (currentVoteStatus === VoteStatus.upvote) {
            props.removeVote(postId, currentVoteStatus);
        } else {
            props.upvotePost(postId, currentVoteStatus)
        }
      }
      
    const handleDownvote = (postId: number, currentVoteStatus: number) => {
        console.log("handleDownvote");
        if (currentVoteStatus === VoteStatus.downvote) {
            props.removeVote(postId, currentVoteStatus);
        } else {
            props.downvotePost(postId, currentVoteStatus)
        }
      }

    const {postId, body, currentVoteStatus,
        totalVotes, header, course, imageSrc, attachment, date} = props.post;
    const {isSignedIn} = props;

    return(
        <div className="jumbotron p-3 pb-1">
                    <div className="row">
                        <div className="col-1">
                        
                        <div>
                            <button onClick={() =>
                            handleUpvote(postId, currentVoteStatus)} 
                            className={currentVoteStatus === VoteStatus.upvote ? "btn-success" : ""}
                            disabled={!isSignedIn ? true : false}>
                                Upvote
                            </button>
                        </div>
                        <div>
                            <button onClick={() =>
                            handleDownvote(postId, currentVoteStatus)}                            
                            className={currentVoteStatus === VoteStatus.downvote ? "btn-success" : ""}
                            disabled={!isSignedIn ? true : false}>
                                Downvote
                            </button>
                        </div>

                        <div>{totalVotes}</div>

                        </div>
                        <div className="col-10">              
                            <Link to={`/post/${postId}`}> {<h1>{header}</h1>}</Link> 
                            <p><b>Course: </b>{course}</p>
                            <p><b>Attachment: </b><a href={imageSrc} target="_blank" rel="noopener noreferrer">{attachment}</a></p>
                            <div className="post-body">
                                <p>{body}</p>
                            </div>
                            <p className="date">{formatDate(date)}</p>
                        </div>
                    </div>
                </div>
    )
}

export default Post;