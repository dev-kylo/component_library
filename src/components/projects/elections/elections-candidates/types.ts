export interface mappedTabI extends regexReplaceI {
    tabtitle: string,
    type: tabType,
    injectcandidates?: string;
    posts?: string[],
    active?: boolean,
    combineresults?: boolean,
    groupings?: mappedGroupingI[]
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

export type MSLPost = {
    Id: number;
    Title: string;
}

// export type MSLCandidate = {
//     DisplayName: string;
//     Id: number;
//     ImageUrl: string;
//     ManifestoUrl?: string;
//     ManifestoLink?: string
//     Post: string | MSLPost;
//     RealName: string;
//     Slate: null | string;
//     Slogan: string;
//     Status: string;
// }
// export type MSLData = MSLCandidate[];

// export type FireBaseCandidate = Omit<MSLCandidate, 'Post' | 'ManifestoUrl'> & { Post: string, ManifestoLink: string }

// export type FireBaseData = FireBaseCandidate[];
