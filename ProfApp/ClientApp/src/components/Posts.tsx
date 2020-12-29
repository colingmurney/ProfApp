import React, { FormEvent } from 'react';
import {PostProps} from './PostForm';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as PostStore from '../store/Post';
import '../css/home.css';
import formatDate from '../utils/formatDate';
import { Link } from 'react-router-dom';

class Posts extends React.Component<PostProps> {
  
    //Dynamically make components for posts, eventually make pagination to load more posts
    public render() {

        const posts: any[] = [];

        this.props.posts.map(post => {

            const {date, course, body, header, postId, attachment, imageSrc} = post;

            return posts.push(
                
                <div className="jumbotron p-3 pb-1">
                    <div className="row">
                        <div className="col-1">
                        {/* Up and down icons for voting on a post.
                        Disabled if no user is not signed in.
                        Highlights option previously selected by user
                        
                        NEED TO MAKE POSTS ENDPOINT RETURN isLiked and isDisLiked FOR EACH POST
                        AND DYNAMICALLY MAKE BUTTONS BELOW  */}

                        Vote Buttons Column
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

export default connect(
    (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(Posts as any)