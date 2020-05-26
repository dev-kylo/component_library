import { Component, h, State, Prop } from '@stencil/core';

@Component({
    tag: 'elections-candidates',
    shadow: true
})


export class ElectionsCandidates {

    @State() data;
    /**Set to true to display results data. False to display All Candidates */
    @Prop() results: boolean = false;
    /**Year elections takes place eg 2020. Not Academic year! */
    @Prop() year: string;
    /**Elections season - Spring or Autumn */
    @Prop() season: string;
    
    @Prop() studentofficers:any;
    @Prop() networkofficers:any;
    /** Either Faculties or Association Names. PLEASE NOTE: The name you provide must appear EXACLTY the same somwhere in every Post Title for that group. */
    @Prop() academicgroups:any;


    @Prop() activeid: string = 'SO';


    dataMap = {
        officers: {
            id: 'SO',
            title: 'Student Officers',
            innertabs: this.studentofficers.split('|')
        },
        network: {
            id: 'NO',
            title: 'Network Officers',
            innertabs: this.networkofficers.split('|')
        },
        nus: {
            id: 'NUS',
            title: 'NUS Delegate',
            innertabs: 'NUS National Conference Delegate',
        },
        academic: {
            id: 'ACADEMIC',
            title: 'Academic',
            innertabs: this.academicgroups.split('|')
        }

    }

    componentDidLoad() {
        // let url = !this.results? `https://elections-b726c.firebaseio.com/${this.year}/${this.season}.json` : `https://elections-results-757f2.firebaseio.com/${this.year}/${this.season}.json`;
        let url = `https://varsity-f9a3f.firebaseio.com/${this.year}/${this.season}.json`
        fetch(url)
            .then(res => res.json())
            .then(candidateData => {
                this.data = candidateData;
            })
      }

    filterOfficerData(searchTerm: string, type){
       return this.data.filter(candidate => candidate[type] === searchTerm.trim())
    }

    filterAcademicData(type: string){
        return this.data.filter(candidate => candidate.Post.includes(type.trim()))
    }

    // filterAllOfficers(type: string){
    //     if (this.data) return this.data.filter(candidate => candidate.Type === type)
    // }

    shortenTitle(title, id:any){

        console.log(id + ' ' + title)
        
        if (id === 'SO'){
            if (title.includes('Welfare')) title = 'VP Welfare & Community';
            else if (title.includes('Health')) title = 'VP Education (Health)';
            else if (title.includes('Postgraduate')) title = 'VP Postgraduate';
            else if (title.includes('Arts')) title = 'VP Education (Arts & Sciences)';
            else if (title.includes('Activities')) title = 'VP Activities & Development';
            else if (title.includes('President')) title = 'President';
        }
        
        else if( id === 'NO') {
            if (title.includes('Generation')) title = 'First Generation';
            else if (title.includes('International')) title = 'International';
            else if (title.includes('People of Colour')) title = 'People of Colour';
            else if (title.includes('Women')) title = "Women's";
            else if (title.includes('Family')) title = 'Family';
            else if (title.includes('Disabled')) title = 'Disabled';
            else if (title.includes('Mature')) title = 'Mature';
            else if (title.includes('LGBT+')) title = 'LGBT+';
        }

        else {}

        return title

    }

    createTabs(){

        //CREATE ARRAY OF FIELDS TO MAP OVER INTO TAB HEADINGS
        const newDataMapArray:any = [];
        if (this.studentofficers) newDataMapArray.push({...this.dataMap.officers})
        if (this.networkofficers) newDataMapArray.push({...this.dataMap.network})
        if (this.filterOfficerData('NUS National Conference Delegate', 'Post')) newDataMapArray.push({...this.dataMap.nus})
        if (this.academicgroups) newDataMapArray.push({...this.dataMap.academic})

        return newDataMapArray.map((field, i) => {
            let activeTab = field.id === this.activeid? true : false;
            return ([
                <tab-header name={field.id + i} active={activeTab} slot="tab-headers"> {field.title}</tab-header>,
                <tab-content name={field.id + i} active={activeTab} slot="tab-content"> 
                        {this.organiseInnerTabs(field)}
                </tab-content>
            ])
        })
    }

    organiseInnerTabs(field){
        let inner;
        switch(field.id){
            case 'NUS':
                inner = <candidate-display data={this.filterOfficerData(field.innertabs, 'Post')}></candidate-display>
            break;
            case 'SO':
                inner = (<inner-tabs-container>
                            {this.createInnerTabs(field.innertabs, field.id)}
                        </inner-tabs-container>)
            break;
            case 'NO':
                inner = (<inner-tabs-container>
                            {this.createInnerTabs(field.innertabs, field.id)}
                        </inner-tabs-container>)
            break;
            case 'ACADEMIC':
                inner = (<inner-tabs-container>
                            {this.createInnerTabs(field.innertabs, field.id)}
                        </inner-tabs-container>)
            break;
            default: inner = ""
        }
        return inner;
    }

    createInnerTabs(array, typeId){

        const ar = array;
        if(this.results && typeId === 'SO'){
            ar.unshift('All')
        } 
        else if( this.results && typeId === 'NO'){
            ar.unshift('All')
        } 
        return ar.map((title, i) => {
            let searchField = title;
            if (title === 'All' && typeId === 'SO') searchField = 'Officer'
            else if (title === 'All' && typeId === 'NO') searchField = 'Network'
            return ([
                <inner-tab-header active={title ==='All' || i===0} name={typeId + i} slot="tab-headers"> {this.shortenTitle(title, typeId)} </inner-tab-header>,
                <inner-tab-content active={title ==='All' || i===0} name={typeId + i} slot="tab-content">     
                    {typeId === 'ACADEMIC'?   
                        <academic-candidate-display data={this.filterAcademicData(searchField)}></academic-candidate-display>  
                        :
                        <candidate-display data={this.filterOfficerData(searchField, title==='All'? 'Type' : 'Post')}></candidate-display>
                    }
                </inner-tab-content>
            ])
        })

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