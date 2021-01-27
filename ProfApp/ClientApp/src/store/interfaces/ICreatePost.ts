// STATE INTERFACES
export interface CreatePostState {
    profs?: Prof[],
    profIdSelected?: string, 
    profNameSelected: string,
    uploadSuccessful?: boolean;
    postCourse?: string,
    postHeader?: string,
    postBody?: string,
    inputFiles: FileList;
    createPostErrorMsg: string;
}

export interface Prof {
    id: string;
    name: string;
}

// ACTION INTERFACES
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

export interface createPostErrorAction {
    type: "ERROR";
    createPostErrorMsg: string;
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
}