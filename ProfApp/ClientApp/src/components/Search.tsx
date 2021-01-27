import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import '../css/search.css';
import { SearchState, SearchPreviewResult } from '../store/interfaces/ISearch';
import { searchActionCreators } from '../store/actions/searchActions';
// import { inputElement } from '../store/actions/searchActions';

type SearchProps =
    SearchState &
    typeof searchActionCreators

class Search extends React.PureComponent<SearchProps> {

    handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.changeSearch(e);
        this.props.searchPreview();
        this.props.displayPreview();
    }

    handleClick() {
        this.props.displayPreview();
    }


    public render() {
        const {searchPreviewResults, isHidden} = this.props;
        const postResults: any[] = [];

        searchPreviewResults.map((result: SearchPreviewResult , index: number) => {
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
                <form autoComplete="off">
                    <input onClick={() => this.handleClick()} onChange={(e) => this.handleSearch(e)} type="text" placeholder="Search For A Post" id="myInput"/>
                    {/* Make 'show' class only when there are results loaded to state from search query */}
                </form>
                <div id="myDropdown" className="dropdown-content show" style={{display: (isHidden ? 'none' : 'block')}}>
                {postResults}
                </div>
            </div>
        )
    }
}

  export default connect(
    (state: ApplicationState) => state.search,
    searchActionCreators
  )(Search as any)