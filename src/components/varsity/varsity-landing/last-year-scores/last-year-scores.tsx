import { Component, h, State, Listen } from '@stencil/core';


@Component({
    tag: 'last-year-scores',
    styleUrl: 'last-year-scores.css',
    shadow: true
})


export class LastYearScores {

    @State() modalOpen = false;
    @State() eventsData;

    clickHandler(e){
        console.log(e);
        this.modalOpen = true;
        this.fetchScoreCardList();
    }

    fetchScoreCardList(){
        let url = `https://varsity-db.firebaseio.com/scores.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.eventsData = data;
            }) 
    }

    mapToLi(){
        let data = this.eventsData;
            return Object.keys(data)
            .map(key => <li>{data[key].name} <br></br><span class="score">UCL {data[key].ucl} : Kings {data[key].kings}</span></li>)
        // if (data.length > 0){
        //     return Object.keys(data)
        //     .map(key => <li>{data[key].name} <br></br><span class="score">UCL {data[key].ucl} : Kings {data[key].kings}</span></li>)
        // }

        // else if (data.length = 0) return <li> No scores ready... <br></br><span class="score">UCL  : Kings </span></li>;

        // else return ''
    }
    
    @Listen('exitModal') closeModal(){
        this.modalOpen = false;
    }

    render() {
        return ([
            <flex-container alignx="center" aligny="center" fillcontainer>
                <a class="button" onClick={(e) => this.clickHandler(e)}>2019's Scores</a>
            </flex-container>,
            <kclsu-modal show={this.modalOpen}>
                    <h3>Last year's scores</h3>
                    <ul>
                        {this.modalOpen? this.mapToLi() : ''}
                    </ul>
            </kclsu-modal>
        ]);
    }
}