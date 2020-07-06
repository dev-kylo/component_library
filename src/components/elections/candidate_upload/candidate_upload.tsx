import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
    tag: 'candidate-upload',
})

export class CandidateUpload {

    /** The JSON generated from the browser-side uploaded excel spreadsheet */
    @Prop() spreadsheetdata:any;
    /** Either 'candidates' or 'results'. Will set the firebase url and key map */
    @Prop() stage: string = 'results';
    /**MSL ELections ID*/
    @Prop() electionid: string;

    @State() successfulUpload: boolean = false;
    @State() error = '';
    @State() modalOpen: boolean = false;
    @State() loading: boolean = false;
    @State() validProps: boolean = false;

    candidatesKeysMap = {
        'display_name': 'Name',
        'post_name': 'Post',
        'ManifestoLink': 'ManifestoLink',
        'ImageLink': 'ImageLink',
        'candidate_status': 'Status'
    }

    resultsKeysMap = {
        'elected_candidate': 'Name',
        'post_title': 'Post',
        'type' : 'Type',
        'candidate_id': 'candidateId',
        'results': 'ResultsLink'
    }

    submitJson(){
     //MAKE A REQUEST TO FIREBASE TO UPLOAD DATA
        const baseUrl = 'https://elections-b726c.firebaseio.com';
        let endpoint;
        if (this.stage === 'candidates') endpoint = 'candidates'; 
        else if (this.stage === 'results') endpoint = 'results';
        else {
            this.error = 'Incorrect component parameter supplied'
            throw new Error();
        };

        //FETCH TOKEN FROM LOCAL STORAGE TO MAKE AUTHENTICATED REQUEST
        const token = localStorage.getItem('kclsu_token');

        if(this.spreadsheetdata){

            let data = JSON.parse(this.spreadsheetdata).map(ob => {
                return this.reBuildObject(this.candidatesKeysMap, ob)
            });

            console.log("parsed data")
            console.log(data)

          //FETCH ALL DATA FROM MSL ELECTION API  
          fetch(`https://www.kclsu.org/svc/voting/elections/${this.electionid}/candidates`)
                .then(res => res.json())
                .then(response => {
                    const candidateInfo = response.filter(candidate => candidate.Id === data.candidateId);
                    //SET IMAGE AND MANIFESTO LINKS
                    console.log('fetched candidate')
                    console.log(candidateInfo)
                    data.ImageLink = candidateInfo.ImageUrl;
                    data.ManifestoLink = candidateInfo.ManifestoUrl;

                    console.log("final body data");
                    console.log(data);

                    const body: any = {
                        method: 'PUT', 
                        body: JSON.stringify(data), 
                    };
            
                    const url = `${baseUrl}/${this.electionid}/${endpoint}.json?auth=${token}`
                    return  fetch(url, body)
                })
                .then(res => {
                    if(!res.ok){
                        this.loading = false;
                        this.successfulUpload = false;
                        this.error = res.statusText;
                    }
                    else {
                        this.error = '';
                        this.successfulUpload = true;
                        this.modalOpen = true;
                        this.loading = false;
                    }

                })
                .catch(er => {
                    this.error = `${er}`;
                    this.loading = false;
                }); 
        }
        else this.error = "Failed to map over supplied spreadsheet data"
    }


    reBuildObject(keyMap, obj){
        //THIS MAPS AN OBJECT AGAINST A SET OF PROPERTIES WE WANT THAT OBJECT TO HAVE
        //THE PROPERTY NAMES IN SPREADHSEET DATA NEED TO BE THE SAME AS THOSE REQUIRED BY CANDIDATE DISPLAY COMPONENTS
        //IT WILL FIND KEYS IN THE KEYMAP, AND RETURN A NEW OBJECT WITH THOSE KEYS 
        return Object.keys(obj).reduce((acc, key) => {
            if(!keyMap[key]){
                return {...acc}
            }
            else {
                return ({
                    ...acc,
                    ...{[keyMap[key]]: obj[key]}
                })
            }
            },
        {})
    }

    createCards(){
        //CREATES PROFILE CARDS FOR PREVIEW

        const keymap = this.stage === 'candidates'? this.candidatesKeysMap : this.resultsKeysMap;
        const data = JSON.parse(this.spreadsheetdata).map(ob => {
            return this.reBuildObject(keymap, ob )
        });
        return <candidate-display data={data}></candidate-display>
       
    }


    @Listen('emitClick') uploadClick(e){
        //LISTEN FOR CLICK TO MAKE REQUEST TO FIREBASE
        if (e.detail === 'upload'){
            this.loading = true;
            this.submitJson();
        }

        //LISTEN FOR CLICK TO CLEAR AN ERROR
        else if (e.detail === 'clear'){
            this.error = null;
        }
    }

    @Listen('exitModal') closeModal(){
        //CLOSE MODAL
        this.modalOpen = false;
    }

    render() {
        console.log("SPREADSHEET DATA BEFORE RENDER")

        //SET THE DATABASE NAME AREA FOR AUTHENTICATION
        // const database = this.stage === 'candidates'? 'elections-candidates' : 'elections-results';

        //CREATE THE PROFILE CARDS IF THERE IS DATA
        let previewCards = this.spreadsheetdata? this.createCards() : <loading-spinner show={true}></loading-spinner>;

        let successfulUploadNotice = ([
            <kclsu-modal show={this.modalOpen}><h4>Success! Candidate data uploaded in the cloud</h4></kclsu-modal>,
            <h3 style={{"color": "green"}}>Upload Completed</h3>,
            <p><em>Your work is done!</em></p>,
            <br></br>
        ])
        

        let content =  (
            <div class="upload_container">
                <user-login database={'elections-candidates'}></user-login>
                <h3>Preview of data</h3>
                <p>Below is an unsorted + unfiltered list of profile cards generated from the spreadsheet. <em>Use to do final checks,</em> eg double check links, images etc.</p>
                <p>Once happy click the Upload button below to upload data to database</p>
                <p>If you do not see a a list of profile cards below, there was an issue with the spreadsheet. Double check all fields are correct by referring to the Website Documentation. </p>
                <kclsu-button emitid="upload">Upload Data</kclsu-button>
                <loading-spinner show={this.loading}></loading-spinner>
                {this.successfulUpload && successfulUploadNotice }
                {!this.successfulUpload? previewCards : '' }

                
            </div>); 
        
        if (this.error) {
            content = (
                <div class="upload_container">
                    <user-login database={'elections-candidates'}></user-login>
                    <h3 style={{"color": "red"}}>Error</h3>
                    <p>{this.error}</p>
                    {this.validProps? <kclsu-button emitid="clear" purple>Try again</kclsu-button> : ''} 
                </div>)
        }

        return content;
    }
}