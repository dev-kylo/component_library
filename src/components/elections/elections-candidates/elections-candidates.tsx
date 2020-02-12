import { Component, h, State } from '@stencil/core';

@Component({
    tag: 'elections-candidates',
    styleUrl: 'elections-candidates.css'
})


export class ElectionsCandidates {

    @State() data;

    componentDidLoad() {
        let url = `https://elections-b726c.firebaseio.com/data.json`
        fetch(url)
            .then(res => res.json())
            .then(candidateData => {
                this.data = candidateData;

            })
      }

    filterOfficerData(position: string){
        if (this.data) return this.data.filter(candidate => candidate.Post === position)
    }

    filterAcademicData(type){
        console.log("Filtered data in elections candidates")
        console.log(this.data.filter(candidate => candidate.Post.includes(type)));
        return this.data.filter(candidate => candidate.Post.includes(type))
    }
    
    render() {
        return (
            <tabs-container>
                <tab-header name="Tab1" active slot="tab-headers"> Student Officers</tab-header>
                <tab-content name="Tab1" active slot="tab-content">
        
                    <inner-tabs-container>
                        <inner-tab-header name="iTab2" slot="tab-headers"> President</inner-tab-header>
                        <inner-tab-content name="iTab2" slot="tab-content">     
                            <candidate-display data={this.filterOfficerData('President (full-time, paid)')}></candidate-display>
                        </inner-tab-content>
            
                        <inner-tab-header name="iTab3" slot="tab-headers"> VP Education (Health)</inner-tab-header>
                        <inner-tab-content name="iTab3" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('Vice President Education (Health) (full time, paid)')}></candidate-display>
                        </inner-tab-content>
                
                        <inner-tab-header name="iTab4" slot="tab-headers"> VP Welfare & Community</inner-tab-header>
                        <inner-tab-content name="iTab4" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('Vice President Welfare & Community (full-time, paid)')}></candidate-display>  
                        </inner-tab-content>
        
                        <inner-tab-header name="iTab5" slot="tab-headers"> VP Postgraduate</inner-tab-header>
                        <inner-tab-content name="iTab5" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('Vice President Postgraduate (full-time, paid)')}></candidate-display>  
                        </inner-tab-content>

                        <inner-tab-header name="iTab6" slot="tab-headers"> VP Education (Arts & Sciences)</inner-tab-header>
                        <inner-tab-content name="iTab6" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('Vice President Education (Arts & Sciences) (full time, paid)')}></candidate-display>  
                        </inner-tab-content>

                        <inner-tab-header name="iTab7" slot="tab-headers"> VP Activities & Development</inner-tab-header>
                        <inner-tab-content name="iTab7" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('Vice President Activities & Development (full-time, paid)')}></candidate-display>  
                        </inner-tab-content>

              </inner-tabs-container>  
            </tab-content>
        
            <tab-header name="Tab2"  slot="tab-headers"> Network Officers</tab-header>
                <tab-content name="Tab2" slot="tab-content">
                    <inner-tabs-container>
                        <inner-tab-header name="iTab8" slot="tab-headers"> Disabled Students' </inner-tab-header>
                        <inner-tab-content name="iTab8" slot="tab-content">
                            <candidate-display data={this.filterOfficerData("Disabled Students' Officer")}></candidate-display>  
                        </inner-tab-content> 

                        <inner-tab-header name="iTab9" slot="tab-headers"> First Generation</inner-tab-header>
                        <inner-tab-content name="iTab9" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('First Generation Officer')}></candidate-display>  
                        </inner-tab-content>
 
                        <inner-tab-header name="iTab99" slot="tab-headers"> International</inner-tab-header>
                        <inner-tab-content name="iTab99" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('International Officer')}></candidate-display>  
                        </inner-tab-content> 

                        <inner-tab-header name="iTab100" slot="tab-headers"> LGBT+ (open place)</inner-tab-header>
                        <inner-tab-content name="iTab100" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('LGBT+ Officer (open place)')}></candidate-display>  
                        </inner-tab-content> 

                        <inner-tab-header name="iTab10" slot="tab-headers"> LGBT+ (trans place)</inner-tab-header>
                        <inner-tab-content name="iTab10" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('LGBT+ Officer (trans place)')}></candidate-display>  
                        </inner-tab-content> 

                        <inner-tab-header name="iTab11" slot="tab-headers"> Mature Students'</inner-tab-header>
                        <inner-tab-content name="iTab11" slot="tab-content">
                            <candidate-display data={this.filterOfficerData("Mature Students' Officer")}></candidate-display>  
                        </inner-tab-content> 

                        <inner-tab-header name="iTab12" slot="tab-headers"> People of Colour</inner-tab-header>
                        <inner-tab-content name="iTab12" slot="tab-content">
                            <candidate-display data={this.filterOfficerData('People of Colour Officer')}></candidate-display>  
                        </inner-tab-content> 

                        <inner-tab-header name="iTab13" slot="tab-headers"> Women's </inner-tab-header>
                        <inner-tab-content name="iTab13" slot="tab-content">
                            <candidate-display data={this.filterOfficerData("Women's Officer")}></candidate-display>  
                        </inner-tab-content> 

                    </inner-tabs-container>
                </tab-content>
        
        
            <tab-header name="Tab3" slot="tab-headers"> NUS Delegates</tab-header>
            <tab-content name="Tab3" slot="tab-content">
                <candidate-display data={this.filterOfficerData('NUS National Conference Delegate (8 places)')}></candidate-display> 
            </tab-content>
        
            <tab-header name="Tab4"  slot="tab-headers"> Academic</tab-header>
            <tab-content name="Tab4"  slot="tab-content">
                <inner-tabs-container>

                    <inner-tab-header name="iTab14" slot="tab-headers"> Bioscience Students' Association</inner-tab-header>
                    <inner-tab-content name="iTab14" slot="tab-content">
                        <academic-candidate-display data={this.filterAcademicData('Bioscience')}></academic-candidate-display>  
                    </inner-tab-content> 

                    <inner-tab-header name="iTab15" slot="tab-headers"> Denmark Hill PGR Association</inner-tab-header>
                    <inner-tab-content name="iTab15" slot="tab-content">
                        <academic-candidate-display data={this.filterAcademicData('Denmark Hill PGR')}></academic-candidate-display>  
                    </inner-tab-content> 

                     <inner-tab-header name="iTab16" slot="tab-headers"> Dental Student Council</inner-tab-header>
                    <inner-tab-content name="iTab16" slot="tab-content">
                        <academic-candidate-display data={this.filterAcademicData('Dental Student Council')}></academic-candidate-display>  
                    </inner-tab-content> 

                    <inner-tab-header name="iTab17" slot="tab-headers"> IoPPN Student Forum </inner-tab-header>
                    <inner-tab-content name="iTab17" slot="tab-content">
                        <candidate-display data={this.filterOfficerData('IoPPN Student Forum')}></candidate-display>  
                    </inner-tab-content> 

                    <inner-tab-header name="iTab18" slot="tab-headers"> Law Council</inner-tab-header>
                    <inner-tab-content name="iTab18" slot="tab-content">
                        <academic-candidate-display data={this.filterAcademicData('Law Council')}></academic-candidate-display>  
                    </inner-tab-content> 

                    <inner-tab-header name="iTab19" slot="tab-headers"> Law Forum</inner-tab-header>
                    <inner-tab-content name="iTab19" slot="tab-content">
                        <candidate-display data={this.filterOfficerData('Law Forum')}></candidate-display>  
                    </inner-tab-content> 

                    <inner-tab-header name="iTab20" slot="tab-headers"> MSA</inner-tab-header>
                    <inner-tab-content name="iTab20" slot="tab-content">
                        <academic-candidate-display data={this.filterAcademicData('MSA')}></academic-candidate-display>  
                    </inner-tab-content>                    

                </inner-tabs-container>
            </tab-content>
        
          </tabs-container>
        );
    }
}