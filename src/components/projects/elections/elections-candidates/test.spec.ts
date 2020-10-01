
import { ElectionsCandidates } from './elections-candidates';
import { springDummyData } from './dummyData/spring_dummy';

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


    // it('should call the correct filter method depending on the type', async () => {
        
    //     const filterPosts = jest.fn();
    //     const filterGroupings = jest.fn();

    //     const helpers = {filterPosts, filterGroupings}

    //     comp.filterSinglePosts = filterPosts;
    //     comp.filterPostGroupings = filterGroupings;

    //     await comp.createInnerTabs({type: 'multiple', posts: ['President']});
    //     expect(filterPosts).toHaveBeenCalledTimes(1);

    //     await comp.createInnerTabs({ type: 'grouping', groupings: ['Bioscience'],});
    //     expect(filterGroupings).toHaveBeenCalledTimes(1);
    // })

    // it('should add "All" tab to inner tabs of multiple posts if results = true,', async () => {
        
    //     comp.results = true;

    //     const filtered = await comp.createInnerTabs({type: 'multiple', combineresults: true, posts: ['President']});
    //     expect(filtered.find(cand =)).toHaveBeenCalledTimes(1);
    // })

})

