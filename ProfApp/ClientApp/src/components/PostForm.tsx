import React, { FormEvent } from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Dropdown from './Dropdown';
import { CreatePostState } from '../store/interfaces/ICreatePost';
import { createPostActionCreators } from '../store/actions/createPostActions';

type PostProps = CreatePostState &
    typeof createPostActionCreators
    
class Post extends React.Component<PostProps> {
    componentDidMount() {
        // retrieve profs before child prof dropdown component renders
        this.props.getProfs();
    }

    handlePostUpload(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.props.uploadPost();
    }

    public render() {
        const {uploadSuccessful} = this.props;

        if (uploadSuccessful === undefined || !uploadSuccessful) {
            return (
                <div>
                    <form onSubmit={(e) => this.handlePostUpload(e)}>
                        <div className="form-row">
                            <div className="form-group col-md-4 mr-5">
                                <label>Course Name</label>
                                <input type="text" className="form-control" onChange={(e) => this.props.changeCourse(e)} required />
                            </div>
                            <div className="form-group col-md-6">    
                                <label>Post Header</label>
                                <input type="text" className="form-control" onChange={(e) => this.props.changeHeader(e)} required/>
                            </div>
                        </div>
                        <div className="form-row">
                            {this.props.profs && <Dropdown />}
                            <div className="form-group col-md-6 ml-5">
                                <label>Attach a file</label>
                                <input type="file" className="form-control-file" onChange={(e) => this.props.uploadFile(e)} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Tell everyone your experience</label>
                                <textarea className="form-control" rows={6} onChange={(e) => this.props.changeBody(e)} required/>
                            </div>
                        </div>
                        <button  className="btn btn-primary col-md-12" type="submit">Upload Post</button>
                    </form>
                    {uploadSuccessful !== undefined && !uploadSuccessful &&
                        <div className="alert alert-danger mt-3" role="alert">
                            There was an error while uploading your post.
                        </div>
                    }
                    
                </div>
            )
        } else {
            return (
                <div className="alert alert-success" role="alert">
                    Put a post successful msg component here.
                </div>
            )
        }
    }
}

export default connect(
    (state: ApplicationState) => state.createPost,
    createPostActionCreators
)(Post as any)