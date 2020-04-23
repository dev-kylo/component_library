import { Component, h, Prop, State, Listen } from '@stencil/core';


@Component({
    tag: 'add-varsity-scores',
    styleUrl: 'add-varsity-scores.css',
    shadow: true
})
export class AddVarsityScores {

    @State() eventsData;
    @State() modalOpen;
    @State() token;
    @State() logInModalOpen = !this.token;
    @State() activeID;
    @State() error;

    @Prop() year: string;

    componentDidLoad(){

        let url = `https://varsity-db.firebaseio.com/${this.year}.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.eventsData = data;
            })              
    }

    @Listen('exitModal') closeModal(e){
        console.log(e)
        this.modalOpen = false;
        this.activeID = '';
    }


    mapToLi(data){
        return data.map(node => {
            let style;
            let scoreText = '';
            if (node.score){
                if (node.score[1] >= 0){
                    style = {
                        'background-color': '#502669',
                        'color' : 'white'
                    }
                    scoreText = `Kings: ${node.score[0]} - UCL: ${node.score[1]}`;
                }
            }
            
            return <li data-id={node.Id} style={style}onClick={(e => this.clickListener(e))}>{node.Title}<br></br>{scoreText}</li>
        })
    }

    createScoreCard(id){
        let event = this.eventsData.find(node => node.Id == id);
        if (event){
            return (
                <div class="event-info">
                    <form onSubmit={(e) => this.submitScore(e)}>
                    <span class="title">{event.Title}</span>
                        <div class="flex">
                            <label> UCL</label>
                            <input type="number" value={event.score? event.score[1] : ''} id="uclScore" />
                        </div>
                        <div class="flex">
                            <label> King's</label>
                            <input type="number" value={event.score? event.score[0] : ''} id="kingScore" />
                        </div>
                        <button>Submit</button>
                    </form>
                 </div>
            );
        }

        else {
            console.log("event not found");
            return '';
        }

    }
    
    submitScore(e){
        e.preventDefault();
        let element = e.target;
        let uclScore = element[0].value;
        let kingsScore = element[1].value;

        let scores = !uclScore || !kingsScore ? [-1, -1] : [kingsScore, uclScore];


        //CAN I USE FIND HERE? 
        let duplicate = [...this.eventsData];
        for(let x = 0; x < duplicate.length; x++){
            if (duplicate[x].Id == this.activeID) {
                duplicate[x].score = scores;
            }
        }

        //NOW UPDATE DATA IN STATE, THEN POST DATA
        this.eventsData = duplicate;
        this.postToDatabase(duplicate);
    }

    postToDatabase(data){
        const token = localStorage.getItem('kclsu_token');
        let url = `https://varsity-db.firebaseio.com/${this.year}.json?auth=${token}`
        let payload: any = {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
        };

        fetch(url, payload)
            .then(res => {
                if (res.status){
                    this.error = '';
                    this.modalOpen = false;
                    this.activeID = false;
                    this.eventsData = data;
                }
            })
            .catch(er => this.error = er); 
    }

    clickListener(e){
        this.activeID = e.target.dataset.id;
        this.modalOpen = true;
    }
    
    
    render() {
      
        let scoreCard = !this.modalOpen? '' : this.createScoreCard(this.activeID);
        return (
            [<h2 style={{"text-align": "center"}}> Add Scores to Database</h2>,
            <user-login database="varsity"></user-login>,
            <flex-container alignx="center">
                <kclsu-modal show={this.modalOpen}>
                    {scoreCard}
                    {this.error? this.error: ''}
                </kclsu-modal>
                <ul>
                {!this.eventsData? '' : this.mapToLi(this.eventsData)}
                </ul>
            </flex-container>
            ]);
    }
}


