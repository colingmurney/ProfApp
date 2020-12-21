import React, { FormEvent } from 'react';
import * as PostStore from '../store/Post';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Dropdown from './Dropdown';


export type PostProps = PostStore.PostState &
    typeof PostStore.actionCreators 

class Post extends React.Component<PostProps> {
    componentDidMount() {
        //dispatch action that retrieves profs available updates state
        this.props.getProfs();
        this.props.fetchPosts();
    }

    // handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         this.props.uploadFile(file);
    //     }
    // }

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
                    "Put a post successful msg component here."
                </div>
            )
        }
    }
}

export default connect(
    (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(Post as any)