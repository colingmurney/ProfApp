import { Action, Reducer } from 'redux';
import {PostState} from '../interfaces/IPost';
import {KnownAction} from '../actions/postActions';

const initialState: PostState = {
    errorMsg: '',
}

export const postReducer: Reducer<PostState> = (state = initialState, incomingAction: Action): PostState => {

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: action.posts,
                errorMsg: action.errorMsg
            };
        case 'UPVOTE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => (
                    post.postId === action.postId ? {...post, currentVoteStatus: action.currentVoteStatus,
                        totalVotes: action.totalVotes } : post
                ))
            }
        case 'DOWNVOTE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => (
                    post.postId === action.postId ? {...post, currentVoteStatus: action.currentVoteStatus,
                        totalVotes: action.totalVotes } : post
                ))
            }
        case 'REMOVE_VOTE':
            return {
                ...state,
                posts: state.posts.map((post) => (
                    post.postId === action.postId ? {...post, 
                        currentVoteStatus: action.currentVoteStatus,
                        totalVotes: action.totalVotes
                    } : post
                ))
            }
        default:
            return state;
    }
};
