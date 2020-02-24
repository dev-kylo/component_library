import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'varsity-total-score',
    styleUrl: 'varsity-total-score.css',
    shadow: true
})
export class VarsityTotalScore {

     ucl = 0;
     kings = 0;

    @Prop() scores;


    calculateScores(){
        console.log("ALL SCORES")
        console.log(this.scores)
        this.scores.forEach(ob => {
            if(ob.score[0] > ob.score[1]) this.kings++;
            else if(ob.score[1] > ob.score[0]) this.ucl++;
            else if(ob.score[1] == ob.score[0]){ this.ucl++; this.kings++}
        })
    }


    
    render() {

         this.calculateScores()
        
        return (
            <div>
                <flex-container alignx="center" aligny="center">
                    <span class="ucl">UCL  {this.ucl}</span>
                    <div class="logo">
                        <img  src="https://kcl-dev.ukmsl.net/pageassets/varsity/VarsityV.png" />
                    </div>
                    <span class="kings">Kings {this.kings}</span> 
                </flex-container>
            </div>
        );
    }
}