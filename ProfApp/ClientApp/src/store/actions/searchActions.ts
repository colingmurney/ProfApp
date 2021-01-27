import axios from 'axios';
import { AppThunkAction } from '../index';
import { SearchPreviewResult, searchPreviewAction, changeSearchAction, toggleSearchPreviewAction } from '../interfaces/ISearch';

export type KnownAction = searchPreviewAction | changeSearchAction | toggleSearchPreviewAction;

export const searchActionCreators = {
    changeSearch: (event: React.ChangeEvent<HTMLInputElement>): changeSearchAction => (
        { type: 'CHANGE_SEARCH', search: event.target.value}),    
    searchPreview: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        // get state from inside action instead of handler
        // changeSearch is called immediately before searchPreview and
        // getting state from handler will be lagged 1 character input
        const {search} = getState().search;

        if (search.length === 0) {
            dispatch({ type: 'SEARCH_PREVIEW', searchPreviewResults: [] });
        }
        else {
        await axios.get<SearchPreviewResult[]>(`api/studentpost/search-preview/?search=${search.trim()}`)
            .then((response) => {
                    dispatch({ type: 'SEARCH_PREVIEW', searchPreviewResults: response.data  });
                })
                .catch(() => {
                    dispatch({ type: 'SEARCH_PREVIEW', errorMsg: "Posts were unable to load" })
            });
        }
    },
    hidePreview: (): toggleSearchPreviewAction => (
        { type: 'TOGGLE_SEARCH_PREVIEW', isHidden: true}
    ),
    displayPreview: (): toggleSearchPreviewAction => (
        { type: 'TOGGLE_SEARCH_PREVIEW', isHidden: false}
    )
}