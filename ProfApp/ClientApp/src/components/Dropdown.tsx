import React from 'react';
import { CreatePostState } from '../store/interfaces/ICreatePost';
import { createPostActionCreators } from '../store/actions/createPostActions';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

type DropdownProps = CreatePostState &
    typeof createPostActionCreators

class Dropdown extends React.Component<DropdownProps> {
    public render() {
        const dropdownList: any[] = [];

        // generate options for professor select dropdown
        this.props.profs.map((prof) => {
        return dropdownList.push(
            <option key={prof.id} value={JSON.stringify({id: prof.id, name: prof.name})} >
            {prof.name}
            </option>
        );
    });
        return (
            <div className="form-group col-md-4">
                <label>Select Professor</label>
                <select className="form-control" onChange={(e) => this.props.selectProf(e)}
                required defaultValue="Professor">
                    <option value="Professor" disabled />
                        {dropdownList}
                </select>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.createPost,
    createPostActionCreators
)(Dropdown as any)