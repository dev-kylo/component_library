import { Component, h, Prop, State, Listen } from '@stencil/core';
import { returnDate, removeParams, getNextEvents } from '../../../utils/utils';
import {slider1, slider2, slider3, sliderBig } from './assets/imageStrings';


@Component({
    tag: 'varsity-landing',
    styleUrl: 'varsity-landing.css',
    shadow: true
})
export class VarsityLanding {

    @Prop() year: string;
    @Prop() currentDate = returnDate(); 

    @State() eventsData;
    @State() scoreModalOpen = false;
    @State() upcomingModalOpen;

    componentDidLoad(){
        let url = `https://varsity-db.firebaseio.com/${this.year}.json`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.eventsData = data;
                console.log("GAME LENGTH")
                console.log(data.length)
            })              
    }

    @Listen('exitModal') closeModal(){
        this.scoreModalOpen = false;
        this.upcomingModalOpen = false;
    }

    launchScores(e){
        e.preventDefault();
        this.scoreModalOpen = true;
    }

    renderLastScoreCard(){
        let evt = this.eventsData.filter(evt => evt.score && evt.score[0] >= 0);
        if (evt.length >= 1){
            evt = evt.pop();
            return <label-card reverse cardtitle={evt.Title} image={removeParams(evt.ImageUrl)} text={`Kings ${evt.score[0]} : UCL ${evt.score[1]}`}></label-card>
        }

        else if (!this.eventsData) return '';

        else {
            let random = this.eventsData[1];
            return <label-card reverse cardtitle={random.Title} image={removeParams(random.ImageUrl)} text={`Still to be decided...`}></label-card>
        }    
    }

    renderScoreCardList(){  
        let played = this.eventsData.filter(evt => evt.score && evt.score[0] >= 0);
        
        if (played.length > 0){
            return played.map(evt => {
                return ([
                    <div class="score-container">
                        <label-card cardtitle={evt.Title} reverse image={removeParams(evt.ImageUrl)} text={`Kings ${evt.score[0]} : UCL ${evt.score[1]}`}></label-card> 
                    </div>
                ])
            })
        }
        else return <label-card cardtitle="No Scores Yet"  text="The battle is still come"reverse></label-card> 
    }


    renderNextMatch(){
        let evt = getNextEvents(this.eventsData, 1)[0];
        if (evt) return <label-card reverse buttonLink={evt.Url} buttonTitle="Find out more" cardtitle={evt.Title} image={removeParams(evt.ImageUrl)}></label-card>
        else return <label-card reverse buttonLink='/events' buttonTitle="See Other  KCLSU Events" cardtitle="0 Varsity games remaining" image="https://scontent.fcpt7-1.fna.fbcdn.net/v/t1.0-9/88068693_10157130396092399_993138396094267392_o.jpg?_nc_cat=105&_nc_sid=da1649&_nc_ohc=2Ni8SDyp6t0AX93FXT4&_nc_ht=scontent.fcpt7-1.fna&oh=0a410e1833f7c4cf870df8139bb33d92&oe=5E94DD7F"></label-card>
    }
    
    render() {

        let data = [...this.eventsData];

        return (
            <div class="grid">
                <div class="verywide item">
                    <h2>London Varsity</h2>
                    <p>From March 6th, King's College London Students' Union (KCLSU Sports) and University College London Union (Team UCL) come together to go head-to-head in the hope of becoming this years' London Varsity Series champion. </p>
                </div>                
                
                <div class="wide item">
                    <span class="tilelabel">Next Match</span>
                    {this.renderNextMatch()}
                </div>  
                <div class="item wide">
                    <span class="tilelabel">Latest Score</span>
                    {this.renderLastScoreCard()}
                </div>
                <div class="item verywide">
                    <varsity-total-score scores={!data? '' : data.filter(evt => evt.score && evt.score[0] >= 0)}></varsity-total-score>
                </div>
                <div class="item wide">
                    <span class="tilelabel">Race to Victory</span>
                    {/* <varsity-weather></varsity-weather> */}
                    <varsity-race target={19} data={!data? '' : data.filter(evt => evt.score && evt.score[0] >= 0)}></varsity-race>
                </div>
                <div class="item wide tall">
                    <span class="tilelabel"><a href='/'>Follow @kclsu</a></span>
                    <image-slider-auto images={sliderBig} interval={10000}></image-slider-auto>
                </div>
                <div class="item wide vtall">
                    <span class="tilelabel">Upcoming</span>
                    <varsity-upcoming data={data}></varsity-upcoming>
                </div>
                <div class="item image">
                    <image-slider-auto images={slider1} interval={5000}></image-slider-auto>
                </div>
                <div class="item image">
                    <image-slider-auto images={slider2} interval={7000}></image-slider-auto>
                </div>
                <div class="item image">
                    <span class="tilelabel">All Scores</span>
                    <flex-container alignx="center" aligny="center" fillContainer>
                        <a class="button"onClick={(e) => this.launchScores(e)}>2020's scores</a>
                    </flex-container>
                    <kclsu-modal show={this.scoreModalOpen}>
                            {this.scoreModalOpen? this.renderScoreCardList() : ''}
                    </kclsu-modal>
                </div>
                <div class="item image">
                    <span class="tilelabel">Last Year's Scores</span>
                    <last-year-scores></last-year-scores>
                </div>
                <div class="item image">
                    <image-slider-auto images={slider3} interval={3000}></image-slider-auto>
                </div>
                <div class="item verywide image">
                    <image-fit-container alt="kclsu american football at a London varsity match" src="https://res.cloudinary.com/kclsu-media/image/upload/c_fill,f_auto,fl_any_format,g_south,h_350,q_94,w_900/v1572949438/website_uploads/Student%20Groups/IMG_9723_kuyxon.jpg"></image-fit-container>
                </div>
            </div>
        );
    }
}