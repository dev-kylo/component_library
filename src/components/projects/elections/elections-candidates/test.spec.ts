import { newSpecPage } from '@stencil/core/testing';
import { ElectionsCandidates } from './elections-candidates';
import { springDummyData } from './assets/spring_dummy';
import { autumnDummyData } from './assets/autumn_dummy';

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

describe('elections-candidates cmp tabs', () => {

    let comp;

    beforeEach(() => {
        comp = new ElectionsCandidates();
        comp.dataMap = springDataMap;
        comp.data = springDummyData.Candidates;
    })


 //NO TESTING FOR MAPDATA()

    it(' should have a createTabs method that returns an array with length 4', async () => {
        expect(comp.createTabs()).toHaveLength(2);
    })


    it('should have a organiseInnerTabs method which does not return false', async () => {
        const result = comp.organiseInnerTabs({    
            tabtitle: 'Student Officers',
            type: 'multiple',
            typeid: 'SO',
            posts: ['President'],
        });
        expect(result).not.toBeFalsy;
    })


    it('should call the correct filter method depending on the type', async () => {
        
        const filterPosts = jest.fn();
        const filterGroupings = jest.fn();

        comp.filterSinglePosts = filterPosts;
        comp.filterPostGroupings = filterGroupings;

        await comp.createInnerTabs({type: 'multiple', posts: ['President']});
        expect(filterPosts).toHaveBeenCalledTimes(1);

        await comp.createInnerTabs({ type: 'grouping', groupings: ['Bioscience'],});
        expect(filterGroupings).toHaveBeenCalledTimes(1);
    })

    it('should add "All" to posts if results, and invoke the filterMutliplePosts function if the Tab Title is "All"', async () => {
        
        const filterPosts = jest.fn();
        const filterMultiple = jest.fn();

        comp.filterSinglePosts = filterPosts;
        comp.filterMutliplePosts = filterMultiple;
        comp.results = true;

        await comp.createInnerTabs({type: 'multiple', combineresults: true, posts: ['President']});
        expect(filterMultiple).toHaveBeenCalledTimes(1);
    })



})

describe('<elections-candidates> filter functions', () => {

    let comp;

    beforeEach(() => {
        comp = new ElectionsCandidates();
        comp.dataMap = springDataMap;
        comp.data = springDummyData.Candidates;
    })

    it('filterSinglePosts() method should provide an array of candidates of correct length', async () => {
        let filtered = comp.filterSinglePosts("Disabled Students' Officer");
        expect(filtered).toHaveLength(2);

        filtered = comp.filterSinglePosts("Vice President Postgraduate (full-time, paid)");
        expect(filtered).toHaveLength(3);

        filtered = comp.filterSinglePosts("Law Council - Anglo-German Law 2nd Year Rep");
        expect(filtered).toHaveLength(1);

    })

    it('filterSinglePosts() method should return an empty array', async () => {
        const filtered = await comp.filterSinglePosts("An incorrect title");
        expect(filtered).toHaveLength(0);
        expect(filtered).toBeTruthy();
    });

    it('filterMultiplePosts() method should return an array of correct length', async () => {
        let filtered =  await comp.filterMutliplePosts(["Vice President Postgraduate (full-time, paid)", "Disabled Students' Officer", "Law Council - Anglo-German Law 2nd Year Rep"]);
        expect(filtered).toHaveLength(6);

        filtered =  await comp.filterMutliplePosts(["Vice President Postgraduate (full-time, paid)", "Disabled Students' Officer"]);
        expect(filtered).toHaveLength(5);
    });


    it('filterPostGroupings() method should return array with post title containing one of the search terms', async () => {
        comp.data = autumnDummyData.Candidates;
        
        let filtered = await comp.filterPostGroupings({searchterms:["Union Development Committee Member"]});
        expect(filtered).toHaveLength(4);

        filtered = await comp.filterPostGroupings({searchterms:["Nursing", "Midwifery"]});
        expect(filtered).toHaveLength(5); // Without 'excludes' this will include an Academic Board post
    });


    it('filterPostGroupings() method should remove each title in the excludes array from the results', async () => {
        comp.data = autumnDummyData.Candidates;

        let filtered = await comp.filterPostGroupings({
            searchterms:["Nursing", "Midwifery"], 
            exclude:['BSc Nursing Mental Health year 2', 'Academic Board - Nursing, Midwifery & Palliative Care Postgraduate Taught Representative']
        });
        
        expect(filtered).toHaveLength(2);

    });


    it('Single test : filterPostGroupings() should use str.replace (if true), to alter the Post Title', async () => {
        comp.data = autumnDummyData.Candidates;
        const filtered = await comp.filterPostGroupings({
            searchterms: ["Union Development Committee Member"], 
            regex: ["Union Development Committee"], 
            replace: ["UDC"]
        });

        expect(filtered[0].Post.Title.includes('Union Development Committee Member')).toBeFalsy();
        expect(filtered[0].Post.Title.includes('UDC')).toBeTruthy();
        expect(filtered).toHaveLength(4);

    });

    it('Multiple test: filterPostGroupings() should use str.replace (if true), to alter the Post Title ', async () => {
        comp.data = autumnDummyData.Candidates;
        // console.log(comp.data)
        const filtered = await comp.filterPostGroupings({
            searchterms: ["Union Development Committee"], 
            regex: ["Union Development Committee", "Member"], 
            replace: ["UDC", "Alien"]
        }); 
        // console.log(filtered);
        expect(filtered[0].Post.Title.includes('Union Development Committee')).toBeFalsy();
        expect(filtered[0].Post.Title.includes('Alien')).toBeTruthy();
    });

})