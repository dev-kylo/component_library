import { Component, h, Prop, State } from '@stencil/core';
import { getNextEvents, returnDate } from '../../../utils/utils';
import { mslEventI } from '../../../types/mslEvents'

@Component({
    tag: 'events-listing',
    shadow: true
})


export class EventsListing {

    /** The MSL event tag to filter events */
    @Prop() eventtag!: string;
    /** Choose the card component for each event */
    @Prop() cardtype: 'label' | 'text' | 'profile' = 'label';
    /** Show event cards in a column */
    @Prop() col: boolean;
    /** The max number of events to display */
    @Prop() limit: string;
    /** The Call To Action text in the link on profile cards*/
    @Prop() cta: string;

    @State() events: mslEventI[];

    componentDidLoad(){
        fetch(`https://www.kclsu.org/svc/feeds/events/6013?subtree=true&types=${this.eventtag}`)
        .then(res => {
          if (!res.ok) throw new Error(res.statusText);
          return res.json();
        })
        .then(data => {
            this.events = getNextEvents(data);
        })
        .catch(er => {
            throw new Error(er);
        })
    }

    private createLabelCards(): HTMLLabelCardElement[]{
        return this.events.map((evt: mslEventI) => 
            <label-card
                cardtitle = {evt.Title}
                image = {evt.ImageUrl}
                link = {evt.Url}
                text= {this.createDateString(evt.StartDate)}
                margin = '15px'
                cardheight= "180px"
            ></label-card>
        );
    };

    private createTextCards(): HTMLTextCardElement[]{
        return this.events.map((evt: mslEventI) => 
            <text-card
                cardtitle = {evt.Title}
                subtext = {this.createDateString(evt.StartDate)}
                link = {evt.Url}
            ></text-card>
        );
    }

    private createProfileCards(): HTMLProfileCardElement[]{
        return this.events.map((evt: mslEventI) => 
            <profile-card
                name = {evt.Title}
                image = {evt.ImageUrl}
                link = {evt.Url}
                cta = {this.cta || 'Find out more'}
                position = {this.createDateString(evt.StartDate)}
            ></profile-card>
        );
    }

    private createDateString(str: string){
        const date = returnDate(str);
        return `${date.weekday} ${date.day} ${date.month}`
    }
    
    render() {

        let cards = [];
        if ( this.events && this.events.length > 0)
            cards = 
                this.cardtype === 'label' ? this.createLabelCards()
                : this.cardtype === 'text' ? this.createTextCards()
                : this.createProfileCards();

        return (
            <profile-card-layout>
            {cards}
            </profile-card-layout>
        //    <flex-container alignx="space-around" wrap>
        //         {cards}
        //     </flex-container>
        );
    }
}