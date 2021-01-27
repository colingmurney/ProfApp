import { Action, Reducer } from 'redux';
import {CreatePostState} from '../interfaces/ICreatePost';
import {KnownAction} from '../actions/createPostActions';

const initialState: CreatePostState = {
    inputFiles: null,
    profNameSelected: "Professor",
    createPostErrorMsg: '',
} 

export const createPostReducer: Reducer<CreatePostState> = (state = initialState, incomingAction: Action): CreatePostState => {

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'CHANGE_COURSE':
            return {
                ...state,
                postCourse: action.postCourse
            };
        case 'CHANGE_HEADER':
            return {
                ...state,
                postHeader: action.postHeader
            };
        case 'CHANGE_BODY':
            return {
                ...state,
                postBody: action.postBody
            };
        case 'GET_PROFS':
            return {
                ...state,
                profs: action.profs
            };
        case 'SELECT_PROF':
            return {
                ...state,
                profIdSelected: action.profIdSelected,
                profNameSelected: action.profNameSelected
            };    
        case 'INPUT_FILE':
            return { 
                ...state,
                inputFiles: action.inputFiles 
            };
        default:
            return state;
    }
};