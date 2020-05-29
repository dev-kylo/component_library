import { Component, h, Prop, State, Listen } from '@stencil/core';

@Component({
    tag: 'candidate-upload',
})

export class CandidateUpload {

    /** The JSON generated from the browser-side uploaded excel spreadsheet */
    @Prop() spreadsheetdata:any;
    /** Either 'candidates' or 'results'. Will set the firebase url and key map */
    @Prop() stage: string;
    /**MSL ELections ID*/
    @Prop() electionid: string;

    @State() successfulUpload: boolean = false;
    @State() error = '';
    @State() modalOpen: boolean = false;
    @State() loading: boolean = false;
    @State() validProps: boolean = false;

    // componentDidLoad(){
    //     //IF UNVALID PROPS, SET ERROR 
    //     if (this.validateProps() === false) {
    //         this.error = 'Check component attributes';
    //         this.validProps = false;
    //     }

    // }

    candidatesKeysMap = {
        'display_name': 'Name',
        'post_name': 'Post',
        'ManifestoLink': 'ManifestoLink',
        'ImageLink': 'ImageLink',
        'candidate_status': 'Status'
    }

    resultsKeysMap = {
        'Name': 'Name',
        'Post': 'Post',
        'ManifestoLink': 'ManifestoLink',
        'ImageLink': 'ImageLink',
        'Type' : 'Type',
        'ResultsLink': 'ResultsLink'
    }

    submitJson(){
        //MAKE A REQUEST TO FIREBASE TO UPLOAD DATA
        let baseUrl;
        if (this.stage === 'candidates') baseUrl ='https://elections-b726c.firebaseio.com';
        else if (this.stage === 'results') baseUrl = 'https://elections-results-757f2.firebaseio.com';
        else {console.log('No stage param specified')};

        const token = localStorage.getItem('kclsu_token');

        if(this.spreadsheetdata){
            let data = JSON.parse(this.spreadsheetdata).map(ob => {
                return this.reBuildObject(this.candidatesKeysMap, ob)
            });

            if (this.stage === 'candidates'){
                //MAKE SURE ONLY APPROVED CANDIDATES ARE IN THE DATA
                data = data.filter(candidate => candidate.Status === 'Approved');
            }
    
            const body: any = {
                method: 'PUT', 
                body: JSON.stringify(data), 
            };
    
            const url = `${baseUrl}/${this.electionid}.json?auth=${token}`

            fetch(url, body)
                .then(res => {
                    console.log(res)
                    if (res.status){
                        this.error = '';
                        this.successfulUpload = true;
                        this.modalOpen = true;
                        this.loading = false;
                    }
        
                })
                .catch(er => {
                    console.log(er)
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

    // validateProps(){
    //     //BE EXTRA CAREFUL OF PROPS SUPPLIED, SO DATA IS NOT UPLOADED TO A RANDOM LOCATION IN DATABASE
        
    //     let valid = true;
    //     if (/202[0-9]/.test(this.year) === false)  valid = false;
    //     else {
    //         switch(this.season){
    //             case 'Spring':
    //                 valid = true;
    //                 break;
    //             case 'Autumn':
    //                 valid = true;
    //             case 'By' :
    //                 valid= true;
    //                 break;
    //             default : valid = false;
    //         }
    //     }
    //     return valid;
    // }

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
        const database = this.stage === 'candidates'? 'elections-candidates' : 'elections-results';

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
                <user-login database={database}></user-login>
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
                    <user-login database={database}></user-login>
                    <h3 style={{"color": "red"}}>Error</h3>
                    <p>{this.error}</p>
                    {this.validProps? <kclsu-button emitid="clear" purple>Try again</kclsu-button> : ''} 
                </div>)
        }

        return content;
    }
}