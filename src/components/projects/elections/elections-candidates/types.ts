export interface mappedTabI extends regexReplaceI {
    tabtitle: string,
    type: tabType,
    posts?: string[],
    active?: boolean,
    combineresults?: boolean,
    groupings? : mappedGroupingI[]
}

export interface mappedGroupingI extends regexReplaceI {
    tabtitle: string,
    searchterms: string[],
    active?: boolean,
    exclude?: string[]
}

export type dataMapI = mappedTabI[];

export type tabType = 'single' | 'multiple' | 'grouping';

export interface mslCandidateI {
    DisplayName: string,
    Post: any,
    ManifestoUrl: string,
    ImageUrl?: string
}
export interface regexReplaceI {
    regex?: string[], 
    replace?: string[]
}
