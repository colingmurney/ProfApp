import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as PostStore from '../store/Post';
import * as LoginStore from '../store/Login';
import '../css/search.css';

export type SearchProps =
    PostStore.PostState &
    typeof PostStore.actionCreators &
    LoginStore.LoginState &
    typeof LoginStore.actionCreators

class Search extends React.PureComponent<SearchProps> {

    // componentDidUpdate() {
    //     if (this.props.search.length > 0) {
    //         this.props.searchPreview();
    //     }
    // }

    handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.changeSearch(e);
        this.props.searchPreview();
    }

    public render() {
        const {searchPreviewResults} = this.props;
        const postResults: any[] = [];

        searchPreviewResults.map((result: PostStore.SearchPreviewResult , index: number) => {
            return postResults.push(
                <div key={index}>
                    {/* relink the a tag css to to the Link below */}
                    <Link to={"/post/" + result.postId}>
                        <b>Post: </b>
                        {result.header}
                        <b> Prof: </b>
                        {result.profFullName}
                    </Link>
                </div>
            )
        })

        return (
            <div className="dropdown">
                {/* <div id="myDropdown" className="dropdown-content "> */}
                {/* <div> */}
                <input onChange={(e) => this.handleSearch(e)} type="text" placeholder="Search For A Post" id="myInput"/>
                {/* Make 'show' class only when there are results loaded to state from search query */}
                <div id="myDropdown" className="dropdown-content show">
                {postResults}
                </div>
            </div>
        )
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
    {
      ...PostStore.actionCreators,
      ...LoginStore.actionCreators
    }
  )(Search as any)