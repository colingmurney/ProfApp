import { Action, Reducer } from 'redux';
import { LoginState } from '../interfaces/ILogin';
import { KnownAction } from '../actions/loginActions';

const initialState: LoginState = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    rememberMe: false,
    isSignedIn: false,
    isFetching: false,
    incorrectCredentials: false,
}

export const loginReducer: Reducer<LoginState> = (state = initialState, incomingAction: Action): LoginState => {

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCHING':
            return { 
                ...state,
                isFetching: action.isFetching
            };
        case 'SIGN_IN':
            return { 
                ...state,
                isSignedIn: action.isSignedIn,
                isFetching: false,
                incorrectCredentials: action.incorrectCredentials
            };
        case 'SIGN_UP':
            return { 
                ...state,
                isSignedIn: action.isSignedIn,
                isFetching: false
            };
        case 'LOGOUT':
            return { 
                ...state,
                isSignedIn: action.isSignedIn
            };
        case 'AUTHENTICATE':
            return { 
                ...state,
                isSignedIn: action.isSignedIn
            };
        case 'CHANGE_EMAIL':
            return { 
                ...state,
                email: action.email 
            };
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        case 'CHANGE_CONFIRM_PASSWORD':
            return {
                ...state,
                confirmPassword: action.confirmPassword 
            };
        case 'CHANGE_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName
            };
        case 'CHANGE_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName
            };
        case 'TOGGLE_REMEMBER_ME':
            return {
                ...state,
                rememberMe: !state.rememberMe
            };
        default:
            return state;
    }
};