import { Component, h, State, Prop, Element } from '@stencil/core';
import { dataMapI, mappedGroupingI, mappedTabI, mslCandidateI } from './types';
// import { autumnDummyData } from './dummyData/autumn_dummy';
import * as helpers from './helperFunctions/helperFunctions';


@Component({
    tag: 'elections-candidates',
    shadow: true
})


export class ElectionsCandidates {

    /**Set to true to display results data. False to display All Candidates */
    @Prop() results: boolean = false;
    /**The election ID from MSL! */
    @Prop() electionid: string;
    /** Filter out RON profiles in the candidate listing */
    @Prop() removeron: boolean = false;
    /** Use the legacy system for results */
    @Prop() legacy: boolean = false;
    /** Choose to use a single page to keep all post result breakdowns. Appears on each candidate profile card, in the breakdown link */
    @Prop() fallbackbreakdownurl;

    @Element() host: HTMLElement;

    @State() data;
    @State() dataMap: dataMapI;

    componentDidLoad() {

        /** Create Tabs Map */
        this.dataMap = helpers.mapData(this.host);

        //FOR TESTING PURPOSES ONLY
        // const dummyData = autumnDummyData.Candidates;
        // this.data = !this.removeron ? dummyData : helpers.filterRON(dummyData);

        /** IF FOR RESULTS, FETCH FROM FIREBASE. ELSE FETCH FROM MSL */
        let url = !this.results ?
            `https://www.kclsu.org/svc/voting/elections/${this.electionid}/candidates`
            :
            `https://www.kclsu.org/svc/voting/elections/${this.electionid}/candidates/elected`

        if (this.results && this.legacy) url = `https://elections-b726c.firebaseio.com/${this.electionid}/results.json`;



        fetch(url)
            .then(res => res.json())
            .then(profileData => {
                const candidates = profileData.Candidates;

                if (this.results) this.data = profileData;

                else {
                    this.data = !this.removeron ?
                        candidates
                        :
                        candidates.filter((cand: mslCandidateI) => { cand.DisplayName !== 'Re-open Nominations (R.O.N.)' });
                }
            })
            .catch(er => {
                console.log('MSL Data Fetch error: ')
                console.log(er);
                this.data = [];
            })
    }

    createTabs() {
        //CREATE ARRAY OF FIELDS TO MAP OVER INTO TAB HEADINGS
        return this.dataMap.map((field: mappedTabI, i) => {
            let active = field.active;
            if (!field.active && i === 0) active = true;

            const uid = field.tabtitle;

            return ([
                <tab-title name={uid} active={active}> {field.tabtitle}</tab-title>,
                <tab-area name={uid} active={active}>
                    {this.organiseInnerTabs(field)}
                </tab-area>
            ])
        })
    }

    organiseInnerTabs(field: mappedTabI) {
        /** DEPENDING ON FIELD TYPE, CREATE EITHER INNER TABBS CONTAINER OR A CANDIDATE DISPLAY */
        let inner;
        if (field.type === 'single') {
            inner = (<candidate-display fallbackbreakdownurl={this.fallbackbreakdownurl} emitpostid={this.results} legacy={this.legacy} data={helpers.filterSinglePosts(field.posts[0], this.data)}></candidate-display>)
        }
        else {
            inner = <kclsu-tabs variant='secondary'> {this.createInnerTabs(field)}</kclsu-tabs>
        }

        return inner;
    }

    createInnerTabs(item: mappedTabI) {
        /** THE INNER TABS FOR EACH FIELD WITH AN INNER TABS CONTAINER */

        if (item.type === 'multiple') {
            /** IF DISPLAYING RESULTS, AN 'ALL' TAB IS ADDED TO KEEP ALL RELATED ROLES UNDER ONE INNER TAB */

            if (this.results && item.combineresults) {
                item.posts.unshift('All');
            }


            return item.posts.map((title, i) => {

                let tabtitle = title;
                let filterFunction = () => helpers.filterSinglePosts(title, this.data);

                if (title === 'All') {
                    filterFunction = () => helpers.filterMutliplePosts(item.posts, this.data);
                }

                else if (item.regex && item.replace) {
                    tabtitle = helpers.regReplace(title, { regex: item.regex, replace: item.replace })
                }

                return ([
                    <tab-title active={title === 'All' || i === 0} name={title}> {tabtitle} </tab-title>,
                    <tab-area active={title === 'All' || i === 0} name={title}>
                        <candidate-display fallbackbreakdownurl={this.fallbackbreakdownurl} emitpostid={this.results} legacy={this.legacy} data={filterFunction()}></candidate-display>
                    </tab-area>
                ])
            })
        }

        else {
            return item.groupings.map((group: mappedGroupingI, i) => {
                return ([
                    <tab-title active={group.active} name={group.tabtitle + i}> {group.tabtitle} </tab-title>,
                    <tab-area active={group.active} name={group.tabtitle + i}>
                        <grouped-candidate-display fallbackbreakdownurl={this.fallbackbreakdownurl} emitpostid={this.results} legacy={this.legacy} data={helpers.filterPostGroupings(group, this.data, this.results)}></grouped-candidate-display>
                    </tab-area>
                ])
            })

        }

    }


    render() {
        if (!this.data) return <div style={{ "height": "50vh", "position": "relative" }}><loading-spinner /></div>

        else return (
            <kclsu-tabs>

                {this.createTabs()}

            </kclsu-tabs>
        );
    }
}