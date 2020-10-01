import { mappedGroupingI, mslCandidateI,regexReplaceI, dataMapI} from '../types';
import { fetchElementAttributes, createArrayFromString } from '../../../../../utils/utils';

export function mapData(parent:any){
    const tabMap = fetchElementAttributes(parent, 'elections-tab') as dataMapI;
    for (const tab of tabMap){
        const title = tab.tabtitle;
        const tabEl = parent.querySelector(`elections-tab[tabtitle='${title}']`);
        if (tab.regex && tab.replace){
            tab.regex = createArrayFromString(tab.regex, '|');
            tab.replace = createArrayFromString(tab.replace, '|');
        }
        if (tab.type === 'grouping'){
            const groupings = fetchElementAttributes(tabEl, 'group-tab');
            if (groupings.length > 0 ){
                tab.groupings = groupings.map((group: mappedGroupingI) => {
                    group.searchterms = createArrayFromString(group.searchterms, '|');
                    if (group.regex && group.replace){
                        group.regex = createArrayFromString(group.regex, '|');
                        group.replace = createArrayFromString(group.replace, '|');
                    }
                    if (group.exclude){
                        group.exclude = createArrayFromString(group.exclude, '|')
                    }
                    return group;
                })
            }
        }
        else {
            tab.posts = createArrayFromString(tab.posts, "|");
        }
    } 
    console.log(tabMap)
    return tabMap;
}

export function filterRON(ar: mslCandidateI[]){
    return ar.filter(cand => cand.DisplayName !== 'Re-open Nominations (R.O.N.)')
}

export function filterSinglePosts(postTitle: string, data: mslCandidateI[]){
    return data.filter(candidate => {
        let post = candidate.Post.Title || candidate.Post;
        return post === postTitle.trim();
    })
}

export function filterMutliplePosts(ar: string[], data: mslCandidateI[]){
    //FOR RESULTS DISPLAY ONLY. FILTERS STUDENT OFFICERS AND NETWORK OFFICERS INTO AN 'ALL' CATEGORY
    const candidatesArrays = [];
    for (const post of ar){
        candidatesArrays.push(filterSinglePosts(post, data));
    }
    return candidatesArrays.reduce((acc, cur) => acc.concat(cur));
}

export function filterPostGroupings(group: mappedGroupingI, data: any, results:boolean){
    //THIS WILL RETURN AN ARRAY OF CANDIDATES WHOSE POST TITLES INCLUDE THE ACADEMIC GROUP TYPE - EG BIOSCIENCE
    const filtered = data.filter((candidate: mslCandidateI) => {
        let post = candidate.Post.Title || candidate.Post;
        post = post.trim();
        let include = false;
        for (const term of group.searchterms){

            if (post.includes(term.trim())) include = true;

            if (group.exclude) {
                const found = group.exclude.find(excludeTerm => excludeTerm === post);
                if (found) include = false;
            }
        }
        return include;
    });

        //IF GROUP HAS REPLACE STRINGS
        if (group.regex){
            return regexReplace<mappedGroupingI>(group, filtered, results);
        }

    return filtered;
}

export function regexReplace<T extends regexReplaceI>(group: T, filtered: mslCandidateI[], results:boolean) : mslCandidateI[]{
    return filtered.map((cand: mslCandidateI) => {
        const candidate = {...cand};
        let post = regReplace(candidate.Post.Title || candidate.Post, group);
        
        if (results){
            candidate.Post = post;
        }
        else {
            candidate.Post = {...cand.Post};
            candidate.Post.Title = post;
        }
        return candidate;
    })       
}

export function regReplace(post: string, group: regexReplaceI){
    group.regex.forEach((rgx, i) => {
        const rgx2 = new RegExp(rgx);
        post = post.replace(rgx2, group.replace[i]);
    })
    return post;
}
