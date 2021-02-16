import { Component, h, Prop, State } from '@stencil/core';
import { getNextEvents } from '../../../../../utils/utils';


@Component({
    tag: 'project-card-events'
})

export class ProjectCardEvents {

    /** The MSL Event tag */
    @Prop() tag: string;
    /** The main heading */
    @Prop() heading: string = "Upcoming Events";
    /** Optional. Supply a URL which the All Events button will link to if there are events. Otherwise this is dynamically set. */
    @Prop() alleventsurl: string ;
    @State() data;
    @State() mobilescreen: boolean = false;
    @State() tabletscreen: boolean = false;
    mobilemediaquery;
    tabletmediaquery;

    componentWillLoad(){
        //CHECK FOR TABLET SCREENS
        this.tabletmediaquery = window.matchMedia('(max-width: 1100px)');
        this.checkTablet(this.tabletmediaquery)
        this.tabletmediaquery.addEventListener('change', this.checkTablet.bind(this));

        //CHECK FOR MOBILE SCREENS
        this.mobilemediaquery = window.matchMedia('(max-width: 550px)');
        this.checkMobile(this.mobilemediaquery);
        this.mobilemediaquery.addEventListener('change', this.checkMobile.bind(this));
    }


    componentDidLoad(){
        fetch(`https://www.kclsu.org/svc/feeds/events/6013?subtree=true&types=${this.tag}`)
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(data => {
            this.data = getNextEvents(data);
        })
        .catch(er => {
            throw new Error(er);
        })
    }

    checkMobile(e){
        if (e.matches) this.mobilescreen = true;
        else this.mobilescreen = false;
    }
    checkTablet(e){
        if (e.matches) this.tabletscreen = true;
        else this.tabletscreen = false;
    }
    
    render() {
        let cards: any = [];
        const mobile = this.mobilescreen;
        const tablet = this.tabletscreen;
        const noevents = <p style={{"padding": "0 2em"}}>There are no current or upcoming events. </p>
        const buttonmsg = this.data && this.data.length > 1 ? `See all ${this.data.length} events` : `See all events` ;

        let buttonUrl = '/events';

        if (this.data){
            const data = [...this.data];
            if (data.length > 0 ){

                //SET THE BUTTON LINK TO AN EVENTS FILTER URL
                buttonUrl = this.alleventsurl? this.alleventsurl : `https://www.kclsu.org/events/?types=${this.tag}`;

                //CREATE LABEL CARDS IF THERE ARE ANY EVENTS
                const length = data.length;
                data.length = mobile && length >=4 ? 4
                                : tablet && length >= 6 ? 6 
                                : length >= 8 ? 8 
                                : length >= 6 ? 6 
                                : length >= 4 ? 4 
                                : length;
                cards = data.map(evt => <label-card 
                                            link={evt.Url}
                                            smallheading 
                                            margin="0.5em" 
                                            cardwidth={mobile? "auto" : tablet? "310px" : "350px"} 
                                            cardheight="110px"  image={evt.ImageUrl} 
                                            cardtitle={evt.Title}>
                                        </label-card>)
            }
        }
        return (
            <div>
                <h3 style={{"padding" : "1em", "text-align": "center"}}>{this.heading}</h3>
                <slot></slot>   
                <flex-container alignx="space-around" aligny="center" wrap>
                    {cards.length > 0 ? cards : noevents}
                    {this.data && this.data.length === 0 ? noevents : ''}
                </flex-container>
                <kclsu-button center link={buttonUrl} margin="2em 1em" newtab> {buttonmsg} </kclsu-button>
            </div>
        );
    }
}