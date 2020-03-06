import { Component, h, Prop} from '@stencil/core';

@Component({
    tag: 'varsity-race',
    styleUrl: 'varsity-race.css',
    shadow: true
})

export class VarsityRace {

    uclwins = 0;
    kingswins = 0;

    @Prop() target: number;
    @Prop() data;

    countWins(){
        for (let x = 0; x < this.data.length; x++){
            let evt = this.data[x];
            if(evt.score[1] > evt.score[0]) this.uclwins++;
            if(evt.score[0] > evt.score[1]) this.kingswins++;
        }
    }

    calculatePercentage(score){
        return (score / this.target) * 100; 
    }

    render(){

        this.countWins();

        if(this.data.length <= 0){
            this.uclwins = 1;
            this.kingswins = 1;
        }
        if(this.uclwins == 0) this.uclwins = 0.5;
        if(this.kingswins == 0) this.kingswins = 0.5;

       this.uclwins = 0.5;
        this.kingswins = 0.5;

        return (
            <div class="race-container">
                <div class="progressbar">
                    <div class="bar-container">
                        <span>Kings</span>
                        <div class="fullwidth">
                            <div class="kings bar" style={{"width": `${this.calculatePercentage(this.kingswins)}%`}}></div>
                        </div>
                    </div>
                    <div class="bar-container">
                        <span>UCL</span>
                        <div class="fullwidth">
                            <div class="ucl bar" style={{"width": `${this.calculatePercentage(this.uclwins)}%`}}></div>
                        </div>
                    </div>
                </div>
                <div class="finish">
                    <span class="victory">Victory</span>
                    </div>
            </div>
        )
    }
};