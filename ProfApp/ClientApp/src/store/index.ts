import {PostState} from './interfaces/IPost';
import {postReducer} from './reducers/postReducer';
import {LoginState} from './interfaces/ILogin';
import {loginReducer} from './reducers/loginReducer';
import {SearchState} from './interfaces/ISearch';
import {searchReducer} from './reducers/searchReducer';
import {CreatePostState} from './interfaces/ICreatePost';
import {createPostReducer} from './reducers/createPostReducer';

// The top-level state object
export interface ApplicationState {
    post: PostState,
    login: LoginState,
    search: SearchState,
    createPost: CreatePostState,
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    post: postReducer,
    login: loginReducer,
    search: searchReducer,
    createPost: createPostReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
