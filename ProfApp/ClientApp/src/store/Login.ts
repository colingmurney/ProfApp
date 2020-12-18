import { Action, Reducer } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import { AppThunkAction } from './';
import { Dispatch } from 'react';
import { ApplicationState } from './';


export interface LoginState {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    rememberMe: boolean;
    isSignedIn: boolean;
    // incorrectCredentials: boolean;
    isSignUpPage: boolean;
    // passwordsDontMatch: boolean;
    userData?: UserData[];
}

export interface UserData {
    id: number;
    firstName: string;
    lastName: string;
}

export interface changeEmailAction { 
    type: 'CHANGE_EMAIL';
    email: string;
}

export interface changePasswordAction {
    type: 'CHANGE_PASSWORD';
    password: string;
}

export interface changeConfirmPasswordAction {
    type: 'CHANGE_CONFIRM_PASSWORD';
    confirmPassword: string;
}

export interface changeFirstNameAction {
    type: 'CHANGE_FIRST_NAME';
    firstName: string;
}

export interface changeLastNameAction {
    type: 'CHANGE_LAST_NAME';
    lastName: string;
}

export interface signInAction {
    type: 'SIGN_IN';
    isSignedIn: boolean;
}

export interface authenticateAction {
    type: 'AUTHENTICATE';
    isSignedIn: boolean;
}

export interface logoutAction {
    type: 'LOGOUT';
    isSignedIn: boolean;
}

export interface signUpAction {
    type: 'SIGN_UP';
    isSignedIn: boolean
}

export interface toggleRemmberMeAction {type: 'TOGGLE_REMEMBER_ME'}
export interface toggleViewAction {type: 'TOGGLE_VIEW'}

export type KnownAction = changeEmailAction | changePasswordAction | toggleRemmberMeAction |
    toggleViewAction | changeConfirmPasswordAction | changeFirstNameAction | changeLastNameAction
    | signInAction | authenticateAction | logoutAction | signUpAction;

export const actionCreators = {
    changeEmail: (event: React.ChangeEvent<HTMLInputElement>): changeEmailAction => (
        { type: 'CHANGE_EMAIL', email: event.target.value}),
    changePassword: (event: React.ChangeEvent<HTMLInputElement>): changePasswordAction => (
        { type: 'CHANGE_PASSWORD', password: event.target.value }),
    changeConfirmPassword: (event: React.ChangeEvent<HTMLInputElement>): changeConfirmPasswordAction => (
        { type: 'CHANGE_CONFIRM_PASSWORD', confirmPassword: event.target.value}),
    changeFirstName: (event: React.ChangeEvent<HTMLInputElement>): changeFirstNameAction => (
        { type: 'CHANGE_FIRST_NAME', firstName: event.target.value}),
    changeLastName: (event: React.ChangeEvent<HTMLInputElement>): changeLastNameAction => (
        { type: 'CHANGE_LAST_NAME', lastName: event.target.value}),
    toggleRememberMe: (): toggleRemmberMeAction => ({type: 'TOGGLE_REMEMBER_ME'}),
    toggleView: (): toggleViewAction => ({type: 'TOGGLE_VIEW'}),

    signIn: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        const {email, password, rememberMe} = appState.login
        const body = {
            Email: email,
            Password: password,
            RememberMe: rememberMe
        }
        await axios({
                method: "post",
                url: "api/authentication/login",
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify(body),
            })
            .then(() => {
                    dispatch({ type: 'SIGN_IN', isSignedIn: true });
                })
                .catch(() => {
                    dispatch({ type: 'SIGN_IN', isSignedIn: false })
                });
    },

    signUp: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const appState = getState();
        const {email, password, confirmPassword, firstName, lastName, rememberMe} = appState.login
        const body = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            ConfirmPassword: confirmPassword,
            RememberMe: rememberMe
        }
        await axios({
                method: "post",
                url: "api/authentication/signup",
                headers: {"Content-Type": "application/json"},
                data: JSON.stringify(body),
            })
            .then(() => {
                    dispatch({ type: 'SIGN_UP', isSignedIn: true });
                })
                .catch(() => {
                    dispatch({ type: 'SIGN_UP', isSignedIn: false })
                });
    },

    authenicate: (): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.get("api/authentication/")
        .then(() => {
                dispatch({ type: 'AUTHENTICATE', isSignedIn: true } as authenticateAction);
            })
            .catch(() => {
                dispatch({ type: 'AUTHENTICATE', isSignedIn: false } as authenticateAction)
            });
    },

    logout: (): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.put("api/authentication/logout")
        .then(() => {
                dispatch({ type: 'LOGOUT', isSignedIn: false } as logoutAction);
            })
            .catch(() => {
                dispatch({ type: 'LOGOUT', isSignedIn: true } as logoutAction)
            });
    },
};


const initialState: LoginState = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    isSignUpPage: false,
    rememberMe: false,
    isSignedIn: false,
}

export const reducer: Reducer<LoginState> = (state = initialState, incomingAction: Action): LoginState => {

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'SIGN_IN':
            return { 
                ...state,
                isSignedIn: action.isSignedIn
            };
        case 'SIGN_UP':
            return { 
                ...state,
                isSignedIn: action.isSignedIn
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
        case 'TOGGLE_VIEW':
            return {
                ...state,
                isSignUpPage: !state.isSignUpPage
            };
        default:
            return state;
    }
};

