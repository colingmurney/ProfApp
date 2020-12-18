import { Action, Reducer } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { AppThunkAction } from './';

export interface PostState {
    profs?: Prof[];
    profIdSelected?: string, 
    profNameSelected: string,
    attachment: string;
    inputFiles: FileList;
    posts?: PostData[]; 
    uploadSuccessful?: boolean;
    errorMsg: string;
    postCourse?: string,
    postHeader?: string,
    postBody?: string,
}

interface PostData {
    
}

interface Prof {
    id: string;
    name: string;
}

export interface inputFileAction {
    type: "INPUT_FILE",
    inputFiles: FileList
}

export interface getProfsAction {
    type: "GET_PROFS",
    profs: Prof[];
}

export interface selectProfAction {
    type: "SELECT_PROF",
    profIdSelected: string;
    profNameSelected: string;
}

export interface errorAction {
    type: "ERROR";
    errorMsg: string;
}

export interface changeCourseAction {
    type: "CHANGE_COURSE";
    postCourse: string;
    
}

export interface changeHeaderAction {
    type: "CHANGE_HEADER";
    postHeader: string;
    
}

export interface changeBodyAction {
    type: "CHANGE_BODY";
    postBody: string;    
}

export interface uploadPostAction {
    type: "UPLOAD_POST";
    uploadSuccessful: boolean;
    errMsg?: string;
}

export type KnownAction = inputFileAction | getProfsAction | selectProfAction | changeCourseAction |
    changeBodyAction| changeHeaderAction | uploadPostAction | errorAction;

export const actionCreators = {
    changeCourse: (event: React.ChangeEvent<HTMLInputElement>): changeCourseAction => (
        { type: 'CHANGE_COURSE', postCourse: event.target.value}),
    changeHeader: (event: React.ChangeEvent<HTMLInputElement>): changeHeaderAction => (
        { type: 'CHANGE_HEADER', postHeader: event.target.value}),
    changeBody: (event: React.ChangeEvent<HTMLTextAreaElement>): changeBodyAction => (
        { type: 'CHANGE_BODY', postBody: event.target.value}),    
    uploadFile: (event: React.ChangeEvent<HTMLInputElement>): inputFileAction =>
        ({ type: "INPUT_FILE", inputFiles: event.target.files }),
    selectProf: (event: React.ChangeEvent<HTMLSelectElement>): selectProfAction => 
        ({ type: "SELECT_PROF", profIdSelected: JSON.parse(event.target.value).id, profNameSelected: JSON.parse(event.target.value).name}),
    getProfs: (): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.get<Prof[]>("api/prof/")
        .then((response) => {
                dispatch({ type: 'GET_PROFS', profs: response.data  } as getProfsAction);
            })
            .catch((err) => {
                dispatch({ type: 'ERROR', errorMsg: err } as errorAction)
            });
    },
    uploadPost: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const {postHeader, postCourse, postBody, profIdSelected, inputFiles, attachment} = getState().post;

        const formData = new FormData();
        formData.append('header', postHeader)
        formData.append('course', postCourse)
        formData.append('body', postBody)
        formData.append('profId', profIdSelected)
        formData.append('attachment', attachment) 
        formData.append('imageFile', inputFiles[0])

        await axios.post<Prof[]>("api/studentpost/upload", formData)
        .then((response) => {
                dispatch({ type: 'UPLOAD_POST', uploadSuccessful: true  } as uploadPostAction);
            })
            .catch((err) => {
                dispatch({ type: 'UPLOAD_POST', uploadSuccessful: false, errMsg: err } as uploadPostAction)
            });
    },
}

const initialState: PostState = {
    attachment: 'This is a temp value to validate ASP.NET CORE model. It is included in create post request',
    inputFiles: null,
    errorMsg: '',
    profNameSelected: "Professor"
} 

export const reducer: Reducer<PostState> = (state = initialState, incomingAction: Action): PostState => {

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
        case 'UPLOAD_POST':
            return {
                ...state,
                uploadSuccessful: action.uploadSuccessful,
            }
        
        default:
            return state;
    }
};