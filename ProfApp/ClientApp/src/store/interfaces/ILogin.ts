export interface LoginState {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    rememberMe: boolean;
    isSignedIn: boolean;
    incorrectCredentials: boolean;
    userData?: UserData[];
    isFetching: boolean;
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
    incorrectCredentials: boolean;
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
    isSignedIn: boolean;
}

export interface fetchingAction {
    type: 'FETCHING';
    isFetching: boolean;
}

export interface toggleRememberMeAction {type: 'TOGGLE_REMEMBER_ME'}