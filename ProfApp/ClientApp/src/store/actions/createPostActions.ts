import axios from 'axios';
import { AppThunkAction } from '../index';
import {Prof, inputFileAction, getProfsAction, selectProfAction, changeCourseAction,
    changeBodyAction, changeHeaderAction, uploadPostAction,
    createPostErrorAction} from '../interfaces/ICreatePost';

export type KnownAction = inputFileAction | getProfsAction | selectProfAction | changeCourseAction |
changeBodyAction| changeHeaderAction | uploadPostAction | createPostErrorAction;

export const createPostActionCreators = {
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
                dispatch({ type: 'ERROR', createPostErrorMsg: err } as createPostErrorAction)
            });
    },
    uploadPost: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const {postHeader, postCourse, postBody, profIdSelected, inputFiles} = getState().createPost;

        const formData = new FormData();
        formData.append('header', postHeader)
        formData.append('course', postCourse)
        formData.append('body', postBody)
        formData.append('profId', profIdSelected)
        if (inputFiles !== null) {
            formData.append('imageFile', inputFiles[0])
        }
        
        await axios.post("api/studentpost/upload", formData)
        .then(() => {
                dispatch({ type: 'UPLOAD_POST', uploadSuccessful: true  } as uploadPostAction);
            })
            .catch(() => {
                dispatch({ type: 'UPLOAD_POST', uploadSuccessful: false } as uploadPostAction)
            });
    }
}