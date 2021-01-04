import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as PostStore from '../store/Post';
import '../css/home.css';
import formatDate from '../utils/formatDate';
import { RouteComponentProps } from 'react-router';
import {Link} from 'react-router-dom';

export type PostProps = PostStore.PostState &
    typeof PostStore.actionCreators &
    RouteComponentProps<{postId: string}>


class Post extends React.Component<PostProps> {
    componentDidMount() {
        const postId = parseInt(this.props.match.params.postId);
        this.props.fetchCurrentPost(postId);
        this.props.resetSearchPreview()
    }
    //Dynamically make components for posts, eventually make pagination to load more posts
    public render() {
    const postId = parseInt(this.props.match.params.postId)
        
      if (this.props.currentPost) {
            const {date, course, body, header, attachment, imageSrc} = this.props.currentPost;

            return (
                <div>
                    <div className="jumbotron p-3 pb-1">
                        

                            <h1>{header}</h1>
                            <p><b>Course: </b>{course}</p>
                            <p><b>Attachment: </b><a href={imageSrc} target="_blank">{attachment}</a></p>
                            <div className="post-body">
                                <p>{body}</p>
                            </div>
                            <p className="date">{formatDate(date)}</p>
                        </div>
                        Put attachment preview here
                </div>
            )
        }

        return "Loading post"
    }
}


export default connect(
    (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(Post as any)