import axios from 'axios';
import { AppThunkAction } from '../index';
import {IPost, VoteStatus, fetchPostsAction,
    voteAction, errorAction} from '../interfaces/IPost';

export type KnownAction = fetchPostsAction | voteAction | errorAction;

export const postActionCreators = {
    fetchPosts: (): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.get<IPost[]>("api/studentpost/")
        .then((response) => {
                dispatch({ type: 'FETCH_POSTS', posts: response.data });
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_POSTS', errorMsg: err})
            });
    },
    fetchPostById: (postId: number ): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        //IF CANNOT MATCH POSTID FROM STATE THEN MAKE API CALL BELOW.
        //IF POST IS FOUND IN POSTS, THEN MAKE DISPATCH TO TAKE THAT POST AND PUT IN currentPost
        const {posts} = getState().post;
        let postInStore = false;

        if (posts) {
            for (let i=0; i<posts.length; i++) {
                console.log(i)
                if (posts[i].postId === postId) {
                    dispatch({ type: 'FETCH_POSTS', posts: [posts[i]]});
                    postInStore = true;
                    break;   
                } 
            }
        }
        
        if (!postInStore) {
            await axios.get<IPost[]>(`api/studentpost/?postId=${postId}`)
            .then((response) => {
                dispatch({ type: 'FETCH_POSTS', posts: response.data });
            })
            .catch((err) => {
                dispatch({ type: 'FETCH_POSTS', errorMsg: err})
            });
        }
    },
    upvotePost: (postId: number, currentVoteStatus: VoteStatus): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.post<number>(`api/vote/upvote/?postId=${postId}`)
            .then((response) => {
                currentVoteStatus = VoteStatus.upvote;
                dispatch({ type: 'UPVOTE_POST', postId: postId, currentVoteStatus: currentVoteStatus, totalVotes: response.data})
            })
            .catch((err) => {
                dispatch({ type: 'ERROR', errorMsg: err } as errorAction);
            });
    },
    downvotePost: (postId: number, currentVoteStatus: VoteStatus): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.post<number>(`api/vote/downvote/?postId=${postId}`)
            .then((response) => {
                currentVoteStatus = VoteStatus.downvote;
                dispatch({ type: 'DOWNVOTE_POST', postId: postId, currentVoteStatus: currentVoteStatus, totalVotes: response.data})
                })
            .catch((err) => {
                dispatch({ type: 'ERROR', errorMsg: err } as errorAction);
            });
    },
    removeVote: (postId: number, currentVoteStatus: VoteStatus): AppThunkAction<KnownAction> => async (dispatch) => {
        currentVoteStatus = VoteStatus.none;
        await axios.post<number>(`api/vote/remove-vote/?postId=${postId}`)
        .then((response) => {
            dispatch({ type: 'REMOVE_VOTE', postId: postId, currentVoteStatus: currentVoteStatus, totalVotes: response.data})
            })
        .catch((err) => {
            dispatch({ type: 'ERROR', errorMsg: err } as errorAction);
        });
    },  
}