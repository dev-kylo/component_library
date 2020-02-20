import { Component, h, State, Prop} from '@stencil/core';


@Component({
    tag: 'create-varsity-data'
})
export class CreateVarsityData {
 
    @State() mslEventData;
    @State() firebaseData;
    @State() updateMessage;
    @State() createMessage;

    @Prop() year: string;
    @Prop() allowcreate: boolean;
    @Prop() msltag: string;
    @Prop() allowupdate: boolean;


    componentDidLoad(){
        if(this.allowcreate){
            let url = `https://www.kclsu.org/svc/feeds/events/6013?subtree=true&types="${this.msltag}"&from=${this.year}-2-1`;
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

    createNewDatabase(e){
        e.preventDefault();
        let alldata = [];
        for (let x = 0; x < this.mslEventData.length; x++){
            // this.mslEventData[x].score = ['3', '5'];
            this.mslEventData[x].score = [];
            alldata.push(this.mslEventData[x]);
        }
        this.postToDatabase(alldata);
    }

    updateDatabase(e){
        e.preventDefault();

        let firebaseClone = [...this.firebaseData];
        let finalData = [];

        for (let x = 0; x < this.mslEventData.length; x++){
            let currentMSL =  this.mslEventData[x];
            let matchIndex = firebaseClone.findIndex(evt => evt.Id === currentMSL.Id)
            if (matchIndex){
                let mslClone = {...currentMSL};
                mslClone.score = firebaseClone[matchIndex].score;
                // mslClone.score = [2 , 30];
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
            .then(res => console.log(res.status)) 
    }

    
    render() {
        let createButton = !this.mslEventData? '' : <a onClick={e => this.createNewDatabase(e)}>Fetch Data</a>
        let updateButton = !this.firebaseData? '' : <a onClick={e => this.updateDatabase(e)}>Update Data</a>
        
        return (
            <flex-container alignx="space-around">
                {createButton}
                {updateButton}
            </flex-container>
        );
    }
}