import { Component, h, Prop, State, Listen, Watch } from '@stencil/core';

@Component({
    tag: 'candidate-upload',
})

export class CandidateUpload {

    /** The JSON generated from the browser-side uploaded excel spreadsheet */
    @Prop() spreadsheetdata:any;
    /** Either 'candidates' or 'results'. Will set the firebase url and key map */
    @Prop() stage: string;
    /**Year elections takes place eg 2020. Not Academic year! */
    @Prop() year: string;
    /**Elections season - Spring or Autumn */
    @Prop() season: string;

    @State() successfulUpload: boolean = false;
    @State() error = '';
    @State() modalOpen: boolean = false;
    @State() loading: boolean = false;
    @State() validProps: boolean = false;

    componentDidLoad(){
        //IF UNVALID PROPS, SET ERROR 
        if (this.validateProps() === false) {
            this.error = 'Check component attributes';
            this.validProps = false;
        }

        if (this.spreadsheetdata && this.stage === 'candidates'){
            //MAKE SURE ONLY APPROVED CANDIDATES ARE IN THE DATA
            this.spreadsheetdata = this.spreadsheetdata.filter(candidate => candidate.candidate_status === 'Approved');
            console.log('SPREADSHEET DATA IN COMP DID LOAD')
            console.log(this.spreadsheetdata)
        }
    }

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
        if (this.stage === 'candidates') baseUrl ='https://varsity-f9a3f.firebaseio.com';
        else if (this.stage === 'results') baseUrl = 'https://varsity-f9a3f.firebaseio.com';
        else {console.log('No stage param specified')};

        if(this.spreadsheetdata){
            let data = this.spreadsheetdata.map(ob => {
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
    
            const url = `${baseUrl}/${this.year}/${this.season}.json`

            fetch(url, body)
                .then(res => {
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
        const data = this.spreadsheetdata.map(ob => {
            return this.reBuildObject(keymap, ob )
        });
        console.log('DATA PASSED TO CANDIDATE DISPLAY')
        console.log(data)
        return <candidate-display data={data}></candidate-display>
       
    }

    validateProps(){
        //BE EXTRA CAREFUL OF PROPS SUPPLIED, SO DATA IS NOT UPLOADED TO A RANDOM LOCATION IN DATABASE
        
        let valid = true;
        if (/202[0-9]/.test(this.year) === false)  valid = false;
        else {
            switch(this.season){
                case 'Spring':
                    valid = true;
                    break;
                case 'Autumn':
                    valid = true;
                case 'By' :
                    valid= true;
                    break;
                default : valid = false;
            }
        }
        return valid;
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

    @Watch('spreadsheetdata') dataUploaded(){
        //IF SPREADSHEETDATA PROP IS UPDATED
        // if (this.stage === 'candidates'){
        //     //MAKE SURE ONLY APPROVED CANDIDATES ARE IN THE DATA
        //     this.spreadsheetdata = this.spreadsheetdata.filter(candidate => candidate.Status === 'Approved');
        // }
        this.error = null;
        this.successfulUpload = false;
    }

    render() {
        console.log("SPREADSHEET DATA BEFORE RENDER")
        console.log(this.spreadsheetdata)
        let previewCards = this.spreadsheetdata? this.createCards() : <loading-spinner show={true}></loading-spinner>;

        let successfulUploadNotice = ([
            <kclsu-modal show={this.modalOpen}><h4>Success! Candidate data uploaded in the cloud</h4></kclsu-modal>,
            <h3 style={{"color": "green"}}>Upload Completed</h3>,
            <p><em>Your work is done!</em></p>,
            <br></br>
        ])
        

        let content =  (
            <div style={{"padding": "1em 2em"}} class="upload_container">
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
                <div style={{"padding": "1em 2em"}} class="upload_container">
                    <h3 style={{"color": "red"}}>Error</h3>
                    <p>{this.error}</p>
                    {this.validProps? <kclsu-button emitid="clear" purple>Try again</kclsu-button> : ''} 
                </div>)
        }

        return content;
    }
}