import { Component, h, Prop, State } from '@stencil/core';
import {getNextEvents} from '../../../../../utils/utils';


@Component({
    tag: 'project-card-events'
})

export class ProjectCardEvents {

    @Prop() tag: string;
    @Prop() heading: string = "Upcoming Events";
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
        fetch(`https://www.kclsu.org/svc/feeds/events/6013?subtree=true`)
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(data => {
            this.data = getNextEvents(data);
            // this.data = data;
        })
        .catch(er => {
            throw new Error(er)
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
        console.log({mobile, tablet})
        const noevents = <p>There are no current or upcoming events.</p>
        const buttonmsg = this.data && this.data.length > 1 ? `See all ${this.data.length} events` : `See all events` ;


        if (this.data){
            const data = [...this.data];
            if (this.data){
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
                    {cards ? cards : noevents}
                    {this.data && this.data.length === 0 ? noevents : ''}
                </flex-container>
                <kclsu-button center link="" margin="2em 1em" newtab> {buttonmsg} </kclsu-button>
            </div>
        );
    }
}