
// STATE INTERFACES
export interface SearchState {
    search: string,
    searchPreviewResults: SearchPreviewResult[],
    isHidden: boolean;
    errorMsg: string,
}

export interface SearchPreviewResult {
    postId: number,
    course: string,
    header: string,
    body: string,
    profFullName: string,
}

// ACTION INTERFACES
export interface changeSearchAction {
    type: "CHANGE_SEARCH";
    search: string;
}

export interface searchPreviewAction {
    type: "SEARCH_PREVIEW";
    searchPreviewResults?: SearchPreviewResult[];
    errorMsg?: string;
}

export interface toggleSearchPreviewAction {
    type: "TOGGLE_SEARCH_PREVIEW";
    isHidden: boolean;
}