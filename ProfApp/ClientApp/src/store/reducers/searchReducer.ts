import { Action, Reducer } from 'redux';
import {SearchState} from '../interfaces/ISearch';
import {KnownAction} from '../actions/searchActions';

const initialState: SearchState = {
    search: "",
    searchPreviewResults: [],
    errorMsg: "",
    isHidden: true
}

export const searchReducer: Reducer<SearchState> = (state = initialState, incomingAction: Action): SearchState => {

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'CHANGE_SEARCH':
            return {
                ...state,
                search: action.search
            };
        case 'SEARCH_PREVIEW':
            return {
                ...state,
                searchPreviewResults: action.searchPreviewResults,
                errorMsg: action.errorMsg,
            }
        case 'TOGGLE_SEARCH_PREVIEW':
            return {
                ...state,
                isHidden: action.isHidden
            }
        default:
            return state;
    }
};