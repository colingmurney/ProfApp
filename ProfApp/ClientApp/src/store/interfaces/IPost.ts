// STATE INTERFACES
export interface PostState {
    posts?: IPost[];
    errorMsg: string;
}

export interface IPost {
    postId: number;
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

export enum VoteStatus {
    downvote,
    upvote,
    none
}

// HANDLERS
export interface IVoteFunction {
    (postId: number, currentVoteStatus: number): void;
}

export interface errorAction {
    type: "ERROR";
    errorMsg: string;
}

export interface fetchPostsAction {
    type: "FETCH_POSTS";
    posts?: IPost[];
    errorMsg?: string;
}

export interface voteAction {
    type: "UPVOTE_POST" | "DOWNVOTE_POST" | "REMOVE_VOTE";
    postId: number;
    currentVoteStatus: VoteStatus;
    totalVotes: number;
    errorMsg?: string;
}

