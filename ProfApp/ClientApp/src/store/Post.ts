import { Action, Reducer } from 'redux';
import axios, { AxiosResponse } from 'axios';
import { AppThunkAction } from './';

export interface PostState {
    profs?: Prof[];
    profIdSelected?: string, 
    profNameSelected: string,
    // attachment: string;
    inputFiles: FileList;
    posts?: Post[];
    uploadSuccessful?: boolean;
    errorMsg: string;
    postCourse?: string,
    postHeader?: string,
    postBody?: string,
    currentPost?: Post,
    search: string,
    searchPreviewResults: SearchPreviewResult[]
}

export interface Post {
    postId: number;
    // date: Date;
    date: string
    course: string,
    header: string,
    body: string,
    attachment: string | null,
    imageFile: null,
    imageSrc: string,
    profId: number,
    prof: null,
    studentId: number,
    student: null,
    currentVoteStatus?: VoteStatus, // for signed in users
    totalVotes: number
}

export interface SearchPreviewResult {
    postId: number,
    course: string,
    header: string,
    body: string,
    profFullName: string,
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
    // errMsg?: string;
}

export interface fetchPostsAction {
    type: "FETCH_POSTS";
    posts?: Post[];
    errorMsg?: string;
}

export interface fetchCurrentPost {
    type?: "FETCH_CURRENT_POST";
    currentPost?: Post;
    errorMsg?: string;
}

export interface voteAction {
    type: "UPVOTE_POST" | "DOWNVOTE_POST" | "REMOVE_VOTE";
    postId: number;
    currentVoteStatus: VoteStatus;
    totalVotes: number;
    errorMsg?: string;
}

export interface changeSearchAction {
    type: "CHANGE_SEARCH";
    search: string;
}

export interface searchPreviewAction {
    type: "SEARCH_PREVIEW";
    searchPreviewResults?: SearchPreviewResult[];
    errorMsg?: string;
}

export enum VoteStatus {
    downvote,
    upvote,
    none
}

export type KnownAction = inputFileAction | getProfsAction | selectProfAction | changeCourseAction |
    changeBodyAction| changeHeaderAction | uploadPostAction | fetchPostsAction | fetchCurrentPost |
    changeSearchAction | voteAction | searchPreviewAction | errorAction;

export const actionCreators = {
    changeCourse: (event: React.ChangeEvent<HTMLInputElement>): changeCourseAction => (
        { type: 'CHANGE_COURSE', postCourse: event.target.value}),
    changeHeader: (event: React.ChangeEvent<HTMLInputElement>): changeHeaderAction => (
        { type: 'CHANGE_HEADER', postHeader: event.target.value}),
    changeBody: (event: React.ChangeEvent<HTMLTextAreaElement>): changeBodyAction => (
        { type: 'CHANGE_BODY', postBody: event.target.value}),
    changeSearch: (event: React.ChangeEvent<HTMLInputElement>): changeSearchAction => (
        { type: 'CHANGE_SEARCH', search: event.target.value}),    
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
    fetchPosts: (): AppThunkAction<KnownAction> => async (dispatch) => {
        await axios.get<Post[]>("api/studentpost/")
        .then((response) => {
                dispatch({ type: 'FETCH_POSTS', posts: response.data  });
            })
            .catch(() => {
                dispatch({ type: 'FETCH_POSTS', errorMsg: "Posts were unable to load"})
            });
    },
    fetchCurrentPost: (postId: number ): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        
        //IF CANNOT MATCH POSTID FROM STATE THEN MAKE API CALL BELOW.
        //IF POST IS FOUND IN POSTS, THEN MAKE DISPATCH TO TAKE THAT POST AND PUT IN currentPost
        const {posts} = getState().post;
        let postInStore = false;

        if (posts) {
            for (let i=0; i<posts.length; i++) {
                console.log(i)
                if (posts[i].postId === postId) {
                    dispatch({ type: 'FETCH_CURRENT_POST', currentPost: posts[i] });
                    postInStore = true;
                    break;   
                } 
            }
        }
        
        if (!postInStore) {
            await axios.get<Post>(`api/studentpost/single/?postId=${postId}`)
            .then((response) => {
                    dispatch({ type: 'FETCH_CURRENT_POST', currentPost: response.data  });
            })
            .catch(() => {
                dispatch({ type: 'FETCH_CURRENT_POST', errorMsg: "Posts were unable to load"})
            });
        }
    },
    upvotePost: (postId: number, currentVoteStatus: VoteStatus): AppThunkAction<KnownAction> => async (dispatch) => {
        let errorMsg = "";
        await axios.post<number>(`api/vote/upvote/?postId=${postId}`)
            .then((response) => {
                currentVoteStatus = VoteStatus.upvote;
                dispatch({ type: 'UPVOTE_POST', postId: postId, currentVoteStatus: currentVoteStatus, totalVotes: response.data})
            })
            .catch((err) => {
                errorMsg = err;
            });
    },
    downvotePost: (postId: number, currentVoteStatus: VoteStatus): AppThunkAction<KnownAction> => async (dispatch) => {
        let errorMsg = "";
        await axios.post<number>(`api/vote/downvote/?postId=${postId}`)
            .then((response) => {
                currentVoteStatus = VoteStatus.downvote;
                dispatch({ type: 'DOWNVOTE_POST', postId: postId, currentVoteStatus: currentVoteStatus, totalVotes: response.data})
                })
            .catch((err) => {
                errorMsg = err;
            });
    },
    removeVote: (postId: number, currentVoteStatus: VoteStatus): AppThunkAction<KnownAction> => async (dispatch) => {
        let errorMsg = "";
        currentVoteStatus = VoteStatus.none;
        await axios.post<number>(`api/vote/remove-vote/?postId=${postId}`)
        .then((response) => {
            dispatch({ type: 'REMOVE_VOTE', postId: postId, currentVoteStatus: currentVoteStatus, totalVotes: response.data})
            })
        .catch((err) => {
            errorMsg = err;
        });
    },  
    uploadPost: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const {postHeader, postCourse, postBody, profIdSelected, inputFiles} = getState().post;

        const formData = new FormData();
        formData.append('header', postHeader)
        formData.append('course', postCourse)
        formData.append('body', postBody)
        formData.append('profId', profIdSelected)
        // formData.append('attachment', attachment)
        if (inputFiles !== null) {
            formData.append('imageFile', inputFiles[0])
        }
        
        await axios.post<Prof[]>("api/studentpost/upload", formData)
        .then((response) => {
                dispatch({ type: 'UPLOAD_POST', uploadSuccessful: true  } as uploadPostAction);
            })
            .catch((err) => {
                dispatch({ type: 'UPLOAD_POST', uploadSuccessful: false } as uploadPostAction)
            });
    },
    searchPreview: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
        const {search} = getState().post;

        if (search.length === 0) {
            dispatch({ type: 'SEARCH_PREVIEW', searchPreviewResults: [] });
        }
        else {
        await axios.get<SearchPreviewResult[]>(`api/studentpost/search-preview/?search=${search.trim()}`)
            .then((response) => {
                    dispatch({ type: 'SEARCH_PREVIEW', searchPreviewResults: response.data  });
                })
                .catch(() => {
                    dispatch({ type: 'SEARCH_PREVIEW', errorMsg: "Posts were unable to load" })
            });
        }
    },
    resetSearchPreview: (): searchPreviewAction => (
        { type: 'SEARCH_PREVIEW', searchPreviewResults: [] }
    )
}

const initialState: PostState = {
    // attachment: 'This is a temp value to validate ASP.NET CORE model. It is included in create post request',
    inputFiles: null,
    errorMsg: '',
    profNameSelected: "Professor",
    search: "",
    searchPreviewResults: []
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
        case 'CHANGE_SEARCH':
            return {
                ...state,
                search: action.search
            };
        case 'GET_PROFS':
            return {
                ...state,
                profs: action.profs
            };
        case 'FETCH_POSTS':
            return {
                ...state,
                posts: action.posts,
                errorMsg: action.errorMsg
            };
        case 'FETCH_CURRENT_POST':
            return {
                ...state,
                currentPost: action.currentPost,
                errorMsg: action.errorMsg
            }    
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
        case 'SEARCH_PREVIEW':
            return {
                ...state,
                searchPreviewResults: action.searchPreviewResults,
                errorMsg: action.errorMsg,
            }
        default:
            return state;
    }
};