import React from 'react';
import * as PostStore from '../store/Post';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as Post from './Post';

interface injected {
    dropdownType: string;
}

type DropdownProps = PostStore.PostState &
    typeof PostStore.actionCreators &
    injected

class Dropdown extends React.Component<DropdownProps> {
    

    //Dynamically render select opitons like in RecLeague App
    public render() {

        const dropdownList: any[] = [];

    // dynamically display the filtered options for the dropdown
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
                <select className="form-control" onChange={(e) => this.props.selectProf(e)} required>
                    <option value="" disabled selected>
                        Professor
                    </option>
                        {dropdownList}
                    
                </select>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.post,
    PostStore.actionCreators
)(Dropdown as any)