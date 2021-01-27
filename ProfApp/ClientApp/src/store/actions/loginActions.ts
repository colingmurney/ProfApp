import axios from 'axios';
import { AppThunkAction } from '../index';
import {changeEmailAction, changePasswordAction, toggleRememberMeAction,
    changeConfirmPasswordAction, changeFirstNameAction, changeLastNameAction,
    signInAction, authenticateAction, logoutAction, signUpAction, fetchingAction} from '../interfaces/ILogin';

export type KnownAction = changeEmailAction | changePasswordAction | toggleRememberMeAction |
    changeConfirmPasswordAction | changeFirstNameAction | changeLastNameAction
    | signInAction | authenticateAction | logoutAction | signUpAction | fetchingAction;

export const loginActionCreators = {
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
    toggleRememberMe: (): toggleRememberMeAction => ({type: 'TOGGLE_REMEMBER_ME'}),

    signIn: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        dispatch({type: 'FETCHING', isFetching: true});

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
                    dispatch({ type: 'SIGN_IN', isSignedIn: true, incorrectCredentials: false });
                })
                .catch(() => {
                    dispatch({ type: 'SIGN_IN', isSignedIn: false, incorrectCredentials: true })
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