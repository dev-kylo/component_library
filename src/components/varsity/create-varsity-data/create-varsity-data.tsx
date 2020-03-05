import { Component, h, State, Prop, Listen} from '@stencil/core';


@Component({
    tag: 'create-varsity-data',
    styleUrl: 'create-varsity-data.css',
    shadow: true
})
export class CreateVarsityData {
 
    @State() mslEventData;
    @State() firebaseData;
    @State() uploadMessage;
    @State() createMessage;
    @State() modalOpen;
    
    

    @Prop() year: string;
    @Prop() allowcreate: boolean;
    @Prop() msltag: string;
    @Prop() allowupdate: boolean;


    componentDidLoad(){
        if(this.allowcreate){
            let url = `https://www.kclsu.org/svc/feeds/events/6013?subtree=true&types=varsity&from=${this.year}-2-1`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.mslEventData = data;
                })
        }

        if(this.allowupdate){
            let url = `https://varsity-db.firebaseio.com/${this.year}.json`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.firebaseData = data;
                })
        }
    }


    @Listen('exitModal') closeModal(e){
        console.log(e)
        this.uploadMessage = '';
        this.modalOpen = false;
    }


    createNewDatabase(e){
        e.preventDefault();
        this.modalOpen = true;
        let alldata = [];
        for (let x = 0; x < this.mslEventData.length; x++){
            this.mslEventData[x].score = [];
            alldata.push(this.mslEventData[x]);
        }
        this.postToDatabase(alldata);
    }

    updateDatabase(e){
        e.preventDefault();
        this.modalOpen = true;

        let firebaseClone = [...this.firebaseData];
        let finalData = [];

        for (let x = 0; x < this.mslEventData.length; x++){
            let currentMSL =  this.mslEventData[x];
            let matchIndex = firebaseClone.findIndex(evt => evt.Id === currentMSL.Id)

            if (matchIndex && matchIndex >= 0){
                let mslClone = {...currentMSL};
                if(firebaseClone[matchIndex].score){
                    mslClone.score = firebaseClone[matchIndex].score;
                }

                finalData.push(mslClone);    
            }
            else finalData.push(currentMSL);
        }

        this.postToDatabase(finalData);
    }


    postToDatabase(data){
   
        let url = `https://varsity-db.firebaseio.com/${this.year}.json`
        let payload: any = {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
        };

        fetch(url, payload)
            .then(res => {
                if (res.ok) this.uploadMessage = `Successful upload!`;
                else this.uploadMessage = `Possible error. Contact the digital coordinator.`
            }) 
            .catch(er => {
                this.uploadMessage = `Upload Failure.......... Error Response from server: ${er}........ Contact the digital coordinator.`
            }) 
    }

    
    render() {

        let createButton = !this.mslEventData? '' : <a onClick={e => this.createNewDatabase(e)} class="button">FETCH DATA</a>
        let updateButton = !this.firebaseData? '' : <a onClick={e => this.updateDatabase(e)} class="button">UPDATE DATA</a>
        
        return (
            <div class="admin">
                <flex-container alignx="space-around">
                    <div class='container'>
                        <h3>FETCH Data From MSL Events Feed</h3>
                        <p> This button will download a NEW set of data from MSL's Events data, and replace what is there before.</p>
                        <p>BEWARE: Any existing data (such as varsity scores) will be replaced for the year specified in the component attribute.</p>
                    {createButton} 
                    </div>
                    <div class='container'>
                        <h3>UPDATE Data with MSL Events Feed</h3>
                        <p>This button will update the database. It will keep all existing scores. Any new events that have been added, or changes made to the events details in the MSL Events Admin, will be added to the database.</p>
                        {updateButton}
                    </div>
                </flex-container>,
                <kclsu-modal show={this.modalOpen}>
                    <h3>Varsity database currently being updated....</h3>
                        {this.uploadMessage}
                </kclsu-modal>
            </div>
        );
    }
}