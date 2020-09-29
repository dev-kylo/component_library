export interface mappedTabI {
    tabtitle: string,
    type: tabType,
    typeid: string,
    posts?: string[],
    active?: boolean,
    combineresults?: boolean,
    shortentitles?: boolean,
    groupings? : mappedGroupingI[]
}

export interface mappedGroupingI {
    tabtitle: string,
    searchterms: string[],
    active?: boolean,
    regex?: string[],
    replace?: string[],
    exclude?: string[]
}

export type dataMapI = mappedTabI[];

export type tabType = 'single' | 'multiple' | 'grouping';

// function shortenTitle(title, id:any){
//     /** To be used for the Tab Headings, so a shorter title appears as the heading*/
       
//        if (id === 'SO'){
//            if (title.includes('Welfare')) title = 'VP Welfare & Community';
//            else if (title.includes('Health')) title = 'VP Education (Health)';
//            else if (title.includes('Postgraduate')) title = 'VP Postgraduate';
//            else if (title.includes('Arts')) title = 'VP Education (Arts & Sciences)';
//            else if (title.includes('Activities')) title = 'VP Activities & Development';
//            else if (title.includes('President')) title = 'President';
//        }
       
//        else if( id === 'NO') {
//            if (title.includes('Generation')) title = 'First Generation';
//            else if (title.includes('International')) title = 'International';
//            else if (title.includes('People of Colour')) title = 'People of Colour';
//            else if (title.includes('Women')) title = "Women's";
//            else if (title.includes('Family') || title.includes('Parents')) title = 'Family';
//            else if (title.includes('Disabled')) title = 'Disabled';
//            else if (title.includes('Mature')) title = 'Mature';
//            else if (title.includes('LGBT+') && title.includes('open')) title = 'LGBT+ (open)';
//            else if (title.includes('LGBT+') && title.includes('trans')) title = 'LGBT+ (trans)';
//            else if (title.includes('LGBT+')) title = 'LGBT+';
//        }

//        else if (id === 'ACADEMIC') return title

//        else {
//            console.log('Unable to shorten title due to incorrect Data Map ID. Title used:' + ' ' + title)
//        }
       

//        return title

//    }