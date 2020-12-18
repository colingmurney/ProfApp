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

    //render a component that is a dynamic drop down menu with profs names
    public render() {
        return (
            <div>
                <form onSubmit={(e) => this.handlePostUpload(e)}>
                    {this.props.profs && <Dropdown />}
                    <input type="text" onChange={(e) => this.props.changeCourse(e)} />
                    <input type="text"onChange={(e) => this.props.changeHeader(e)} />
                    <textarea cols={30} rows={10} onChange={(e) => this.props.changeBody(e)} />
                    <input type="file" onChange={(e) => this.props.uploadFile(e)} />
                    {/* onChange={(e) => this.handleFileUpload(e)} */}
                    <button type="submit">Upload Post</button>
                </form>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(Post as any)