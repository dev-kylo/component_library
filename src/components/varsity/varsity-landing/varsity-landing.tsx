import { Component, h, Prop, State } from '@stencil/core';
import { returnDate, removeParams } from '../../../utils/utils';


@Component({
    tag: 'varsity-landing',
    styleUrl: 'varsity-landing.css',
    shadow: true
})
export class VarsityLanding {

    @Prop() year: string;
    @Prop() currentDate = returnDate(); 

    @State() eventsData;

    componentDidLoad(){
        let url = `https://varsity-db.firebaseio.com/${this.year}.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.eventsData = data;
            })              
    }

    getNextMatches(length){
        let d = new Date();
        let ISOdate = d.toISOString();
        let index = this.eventsData.findIndex(evt => {
            return evt.StartDate > ISOdate;
        })

        return this.eventsData.slice(index, length)
    }

    renderLastScoreCard(){
        let evt = this.eventsData.filter(evt => evt.score).pop();
        return <label-card reverse cardtitle={evt.Title} image={removeParams(evt.ImageUrl)} text={`Kings ${evt.score[0]} : UCL ${evt.score[1]}`}></label-card>
    }

    renderNextMatch(){
        let evt = this.getNextMatches(1)[0];
        return <label-card reverse buttonLink={evt.Url} buttonTitle="Find out more" cardtitle={evt.Title} image={removeParams(evt.ImageUrl)}></label-card>
    }
    
    render() {

        let data = this.eventsData;

        return (
            <div class="grid">
                <div class="verywide item">
                    <h2>London Varsity</h2>
                    <p>From March 8th, King's College London Students' Union (KCLSU Sports) and University College London Union (Team UCL) come together to go head-to-head in the hope of becoming this years' London Varsity Series champion. </p>
                </div>                
                
                <div class="wide item">
                    <span class="tilelabel">Next Match</span>
                    {this.renderNextMatch()}
                </div>  
                <div class="item wide">
                    <span class="tilelabel">Previous Score</span>
                    {this.renderLastScoreCard()}
                </div>
                <div class="item verywide">
                    <varsity-total-score scores={!data? '' : data.filter(evt => evt.score)}></varsity-total-score>
                </div>
                <div class="item wide">
                    <span class="tilelabel">Today's Weather</span>
                    
                </div>
                <div class="item wide tall">
                    <span class="tilelabel">@KCLSU</span>
                    
                </div>
                <div class="item wide vtall">
                    <span class="tilelabel">Upcoming</span>
                    <varsity-upcoming data={this.getNextMatches(8)}></varsity-upcoming>
                </div>
                <div class="item image">
                    Image
                </div>
                <div class="item image">
                   Image
                </div>
                <div class="item image">
                    <span class="tilelabel">Varsity Scores</span>
                    <flex-container alignx="center" aligny="center">
                        <purple-button link="/"></purple-button>
                    </flex-container>
                </div>
                <div class="item image">
                    Image
                </div>
                <div class="item image">
                    Image
                </div>
                <div class="item verywide image">
                    Image
                </div>
            </div>
        );
    }
}