
import { ElectionsCandidates } from '../elections-candidates';
import { springDummyData } from '../dummyData/spring_dummy';
import { autumnDummyData } from '../dummyData/autumn_dummy';
import * as helpers from './helperFunctions';

let springDataMap = [{
    tabtitle: 'Student Officers',
    type: 'multiple',
    typeid: 'SO',
    posts: ['President'],
},
{
    tabtitle: 'Academic',
    type: 'grouping',
    typeid: 'AC',
    groupings: [{tabtitle: 'Bio', searchterms: ['Bioscience']}, {tabtitle: 'PPI', searchterms: ['PPI']}]
}
]

let data = springDummyData.Candidates;
let autumnData = autumnDummyData.Candidates;

describe('<elections-candidates> filter functions', () => {

    let comp;

    beforeEach(() => {
        comp = new ElectionsCandidates();
        comp.dataMap = springDataMap;
        comp.data = springDummyData.Candidates;
    })

    it('filters out R-open Nominations (RON) candidates from the array', async() => {
        let results = helpers.filterRON(comp.data);
        const ron = results.find(cand => cand.DisplayName === 'Re-open Nominations (R.O.N.)');
        expect(ron).toBeFalsy();
    })

    it('filterSinglePosts() method should provide an array of candidates of correct length', async () => {
        let filtered = helpers.filterSinglePosts("Disabled Students' Officer", data);
        expect(filtered).toHaveLength(2);

        filtered = helpers.filterSinglePosts("Vice President Postgraduate (full-time, paid)", data);
        expect(filtered).toHaveLength(3);

        filtered = helpers.filterSinglePosts("Law Council - Anglo-German Law 2nd Year Rep", data);
        expect(filtered).toHaveLength(1);

    })

    it('filterSinglePosts() method should return an empty array', async () => {
        const filtered = await helpers.filterSinglePosts("An incorrect title", data);
        expect(filtered).toHaveLength(0);
        expect(filtered).toBeTruthy();
    });

    it('filterMultiplePosts() method should return an array of correct length', async () => {
        let filtered =  await helpers.filterMutliplePosts(["Vice President Postgraduate (full-time, paid)", "Disabled Students' Officer", "Law Council - Anglo-German Law 2nd Year Rep"], data);
        expect(filtered).toHaveLength(6);

        filtered =  await helpers.filterMutliplePosts(["Vice President Postgraduate (full-time, paid)", "Disabled Students' Officer"], data);
        expect(filtered).toHaveLength(5);
    });


    it('filterPostGroupings() method should return array with post title containing one of the search terms', async () => {
        
        let filtered = await helpers.filterPostGroupings({searchterms:["Union Development Committee Member"], tabtitle:"Dummy"}, autumnData, false);
        expect(filtered).toHaveLength(4);

        filtered = await helpers.filterPostGroupings({searchterms:["Nursing", "Midwifery"], tabtitle: "Dummy"}, autumnData, false);
        expect(filtered).toHaveLength(5); // Without 'excludes' this will include an Academic Board post
    });


    it('filterPostGroupings() method should remove each title in the excludes array from the results', async () => {

        let filtered = await helpers.filterPostGroupings({
            searchterms:["Nursing", "Midwifery"], 
            tabtitle: "Dummy",
            exclude:['BSc Nursing Mental Health year 2', 'Academic Board - Nursing, Midwifery & Palliative Care Postgraduate Taught Representative']
        }, autumnData, false);
        
        expect(filtered).toHaveLength(2);

    });


    it('Single test : filterPostGroupings() should use str.replace (if true), to alter the Post Title', async () => {
        const filtered = await helpers.filterPostGroupings({
            searchterms: ["Union Development Committee Member"], 
            tabtitle: "Dummy",
            regex: ["Union Development Committee"], 
            replace: ["UDC"]
        }, autumnData, false);

        expect(filtered[0].Post.Title.includes('Union Development Committee Member')).toBeFalsy();
        expect(filtered[0].Post.Title.includes('UDC')).toBeTruthy();
        expect(filtered).toHaveLength(4);

    });

    it('Multiple test: filterPostGroupings() should use str.replace (if true), to alter the Post Title ', async () => {
        const filtered = await helpers.filterPostGroupings({
            searchterms: ["Union Development Committee"], 
            tabtitle: "Dummy",
            regex: ["Union Development Committee", "Member"], 
            replace: ["UDC", "Alien"]
        }, autumnData, false); 
        expect(filtered[0].Post.Title.includes('Union Development Committee')).toBeFalsy();
        expect(filtered[0].Post.Title.includes('Alien')).toBeTruthy();
    });

})