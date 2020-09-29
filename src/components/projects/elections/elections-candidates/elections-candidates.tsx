import { Component, h, State, Prop, Element } from '@stencil/core';
import { fetchElementAttributes, createArrayFromString, createId } from '../../../../utils/utils';
import { dataMapI, mappedGroupingI, mappedTabI } from './types';
// import { springDummyData } from './assets/spring_dummy';
import { autumnDummyData } from './assets/autumn_dummy';


@Component({
    tag: 'elections-candidates',
    shadow: true
})



export class ElectionsCandidates {

    /**Set to true to display results data. False to display All Candidates */
    @Prop() results: boolean = false;
    /**The election ID from MSL! */
    @Prop() electionid: string;
    /**A string of exact role names for student officers, separated by the | sign */
    @Prop() studentofficers:any;
    /**A string of exact role names for network officers, separated by the | sign */
    @Prop() networkofficers:any;
    /** A string lof either Faculties or Association search terms, separated by the | sign. PLEASE NOTE: The name will be used to filter all roles, as well as be used for the Tab Header title*/
    @Prop() academicgroups:any;
    /** The primary acrtive tab that will be open on page load */
    @Prop() activeid: string = 'SO';

    @Element() host: HTMLElement;

    
    @State() data;
    @State() dataMap: dataMapI;

    componentDidLoad() {

        /** Create Tabs Map */
        this.dataMap = this.mapData(this.host);
        this.data = autumnDummyData.Candidates;

        /** IF FOR RESULTS, FETCH FROM FIREBASE. ELSE FETCH FROM MSL */
        // let url = !this.results? 
        //             `https://www.kclsu.org/svc/voting/elections/${this.electionid}/candidates`
        //             :
        //             `https://elections-b726c.firebaseio.com/${this.electionid}/results.json`;
        // fetch(url)
        //     .then(res => res.json())
        //     .then(profileData => {
        //         if (this.results) this.data = profileData;
        //         else this.data = profileData.Candidates;
        //     })
      }

   mapData(parent){
        const tabMap = fetchElementAttributes(parent, 'elections-tab') as dataMapI;

        for (const tab of tabMap){
            const title = tab.tabtitle;
            const tabEl = parent.querySelector(`elections-tab[tabtitle='${title}']`);
            if (tab.type === 'grouping'){
                const groupings = fetchElementAttributes(tabEl, 'post-grouping');
                if (groupings.length > 0 ){
                    tab.groupings = groupings.map((group: mappedGroupingI) => {
                        group.searchterms = createArrayFromString(group.searchterms, '|');
                        if (group.regex && group.replace){
                            console.log('this is true')
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

    filterSinglePosts(postTitle: string){
        return this.data.filter(candidate => {
            let post = candidate.Post.Title || candidate.Post;
            return post === postTitle.trim();
        })
    }

    filterMutliplePosts(ar: string[]){
        //FOR RESULTS DISPLAY ONLY. FILTERS STUDENT OFFICERS AND NETWORK OFFICERS INTO AN 'ALL' CATEGORY
        const candidatesArrays = [];
        for (const post of ar){
            candidatesArrays.push(this.filterSinglePosts(post))
        }
        return candidatesArrays.reduce((acc, cur) => acc.concat(cur))

    }

    filterPostGroupings(group: mappedGroupingI){
        //THIS WILL RETURN AN ARRAY OF CANDIDATES WHOSE POST TITLES INCLUDE THE ACADEMIC GROUP TYPE - EG BIOSCIENCE
        const filtered = this.data.filter(candidate => {
            let post = candidate.Post.Title || candidate.Post;
            post = post.trim();
            let include = false;
            for (const term of group.searchterms){
    
                if (post.includes(term.trim())) include = true

                if (group.exclude) {
                    const found = group.exclude.find(excludeTerm => excludeTerm === post);
                    if (found) include = false;
                }
            }
            return include;
        });

            //IF GROUP HAS REPLACE STRINGS
            if (group.regex){
                return filtered.map(cand => {
                    const candidate = {...cand};
                    let post = candidate.Post.Title || candidate.Post;
                    
                    group.regex.forEach((rgx, i) => {
                        const rgx2 = new RegExp(rgx);
                        post = post.replace(rgx2, group.replace[i]);
                    })
                    if (this.results){
                        candidate.Post = post;
                    }
                    else {
                        candidate.Post = {...cand.Post};
                        candidate.Post.Title = post;
                    }
                    return candidate;
                })
            }

        return filtered;
    }


    createTabs(){
    //CREATE ARRAY OF FIELDS TO MAP OVER INTO TAB HEADINGS
        return this.dataMap.map((field:mappedTabI, i) => {
            let active = field.active;
            if (!field.active && i ===0) active = true;

            const uid = createId();
            return ([
                <tab-header name={uid} active={active} slot="tab-headers"> {field.tabtitle}</tab-header>,
                <tab-content name={uid} active={active} slot="tab-content"> 
                        {this.organiseInnerTabs(field)}
                </tab-content>
            ])
        })
    }

    organiseInnerTabs(field: mappedTabI){
    /** DEPENDING ON FIELD TYPE, CREATE EITHER INNER TABBS CONTAINER OR A CANDIDATE DISPLAY */

        let inner;
        switch(field.type){
            case 'single':
                 inner = <candidate-display data={this.filterSinglePosts(field.posts[0])}></candidate-display>
            break;
            case 'multiple':
                inner = (<inner-tabs-container>
                            {this.createInnerTabs(field)}
                        </inner-tabs-container>)
            break;
            case 'grouping':
                inner = (<inner-tabs-container>
                            {this.createInnerTabs(field)}
                        </inner-tabs-container>)
            break;
            default: inner = ""
        }
        return inner;
    }

    createInnerTabs(item: mappedTabI){
    /** THE INNER TABS FOR EACH FIELD WITH AN INNER TABS CONTAINER */

    if (item.type === 'multiple'){
        /** IF DISPLAYING RESULTS, AN 'ALL' TAB IS ADDED TO KEEP ALL RELATED ROLES UNDER ONE INNER TAB */
    
        if (this.results && item.combineresults){
            item.posts.unshift('All');
        } 

        return item.posts.map((title, i) => {
            let filterFunction = () => this.filterSinglePosts(title);
            
            if (title === 'All') {
                filterFunction = () => this.filterMutliplePosts(item.posts);
            }

            return ([
                <inner-tab-header active={title ==='All' || i===0} name={title + i} slot="tab-headers"> {title} </inner-tab-header>,
                <inner-tab-content active={title ==='All' || i===0} name={title+ i} slot="tab-content">     
                        <candidate-display data={filterFunction()}></candidate-display>
                </inner-tab-content>
            ])
        })
    }

    else {
        return item.groupings.map((group: mappedGroupingI, i) => {
            return ([
            <inner-tab-header active={group.active} name={ group.tabtitle + i} slot="tab-headers"> {group.tabtitle} </inner-tab-header>,
                <inner-tab-content active={group.active} name={group.tabtitle+ i} slot="tab-content">     
                        <academic-candidate-display data={this.filterPostGroupings(group)}></academic-candidate-display>  
                </inner-tab-content>
            ])
        })

    }


    }

    
    render() {
        if (!this.data) return <div style={{"height": "50vh", "position": "relative"}}><loading-spinner /></div>

        else return (
            <tabs-container>

               { this.createTabs()}
        
            </tabs-container>
        );
    }
}