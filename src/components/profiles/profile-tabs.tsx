import { Component, h, Prop, State } from '@stencil/core';


@Component({
    tag: 'profile-tabs',
    styleUrl: 'profile-tabs.css',
    shadow: true
})
export class ProfileTabs {

    /** Array with child arrays containing Tab Heading, Tab ID, and Text(optional) */
    @Prop() headings:any = [['First Tab', 'Tab1', 'A maximum of two lines of text can go here. This is meant only as a brief introduction'], ['Second Tab', 'Tab2']];
    /**Specify Tab ID you want to keep open by default */
    @Prop() activeid:string = 'Tab1';
    /** The URL of the database to fetch profiles from (firebase) */
    @Prop() database:string;

    @State() profiles:any;
    @State() activebio:any;
    @State() modalopen:boolean = false;

    componentDidLoad(){
        if(this.database){
            fetch(this.database)
                .then(res => res.json())
                .then(data => this.profiles = data)
        }
    }
    
    createTabs(){
        let headings = JSON.parse(this.headings)
        return headings.map((ar) => {
            let activeTab = ar[1] === this.activeid? true : false;
            let description = !ar[2]? '' : ar[2];
            return ([
                <tab-title name={ar[1]} active={activeTab}> {ar[0]}</tab-title>,
                <tab-area name={ar[1]} active={activeTab}> 
                    <p>{description}</p>
                    <profile-card-layout>
                        {this.profiles? this.mapToCards(this.profiles, ar[1], ar[0]) : ''}
                    </profile-card-layout>
                </tab-area>
            ])
        })
    }

    mapToCards(data, filterId, category){
        let profiles = Object.keys(data).map(key => {
            let ob = data[key];
            ob.key = key;
            return ob
        });
        return profiles
            .filter(profile => profile.type === filterId)
            .map((profile) =>{ 
    
            return <profile-card 
                       name={profile.name}
                       position={category}
                       emitid={profile.key}
                       image={profile.url} 
                       primaryfn={() => this.openModal(profile.key)}
                       cta='learn more'
                       secondcta = {profile.upcomingEvent? 'upcoming' : ''}
                       secondlink = {profile.upcomingEvent || ''}
                   />
       })
    }

    launchBio(){
        return <full-bio data={!this.profiles? '' : this.profiles[this.activebio]}></full-bio>
    }


    openModal(id){
        console.log('setting modal to open');
        this.activebio = id;
        this.modalopen = true;
    }

    closeHandler(){
        this.modalopen= false;
    }

    render() {
        return ([
            <kclsu-modal exitfn={this.closeHandler.bind(this)} autoexit show={this.modalopen}>
                {this.modalopen? this.launchBio(): ''}
            </kclsu-modal>,
            <kclsu-tabs>
                {this.createTabs()}
            </kclsu-tabs>
        ]);
    }
}