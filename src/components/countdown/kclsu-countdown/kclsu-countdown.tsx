import { Component, h, Prop, State } from '@stencil/core';


@Component({
    tag: 'kclsu-countdown',
    styleUrl: 'kclsu-countdown.css',
    shadow: true
})
export class KclsuCountdown {

    /** The date to countdown to. Must match date string format */
    @Prop() date!: string;
    /** Optional: set a fixed font-size for tablet, desktop and wider. */
    @Prop() fontsize;
    /** Optional: set a colour for the text beneath the countdown. */
    @Prop() textcolour;
    /** The text beneath the countdown */
    @Prop() text;

    countDownDate : Date;

    @State() timer: any;
    @State() timeObject: {days:number, hours: number, minutes: number, seconds: number}

    componentDidLoad(){

        if (!this.countDownDate) this.countDownDate = new Date(this.date);

        this.timer = setInterval(()=> {
            const distance = this.calculateTimeRemaining();
            const timeOb = this.calculateTimes(distance);
                //WHEN THE COUNTDOWN FINISHES
                if (distance <= 0) {
                clearInterval(this.timer);
                }
            
                //DISPLAY RESULT IN HTML
                else {
                    this.timeObject = timeOb;
                }
            }, 1000);

    }

    // componentShouldUpdate(newVal, oldVal, name){
    //     if (name === )
    // }

    calculateTimeRemaining(){
            const timeNow : Date = new Date();
            return this.countDownDate.getTime() - timeNow.getTime();
    }

      //CONVERT TIME CALCS INTO DAYS, HOURS, MINS, SECS
    calculateTimes(x){
        return {
            days : Math.floor(x / (1000 * 60 * 60 * 24)),
            hours : Math.floor((x % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes : Math.floor((x % (1000 * 60 * 60)) / (1000 * 60)),
            seconds : Math.floor((x % (1000 * 60)) / 1000)
        }
    }
    
    render() {

        if (this.timeObject){
           var {days, hours, minutes, seconds} = this.timeObject;
        }

        let fontsize;
        if(screen.width > 600) {
            fontsize = {
                'font-size': this.fontsize? this.fontsize : '6vw'
            }
        }
    

        return (
            <div class="countdown">
                <div class="flex">
                    <div class="timeBlock">
                        <span style={fontsize}>{days ?? '-'}</span>
                        <span>DAYS</span>
                    </div>
                    <div class="timeBlock">
                        <span style={fontsize}>{hours ?? '-'}</span>
                        <span>HOURS</span>  
                    </div>
                    <div class="timeBlock">
                        <span style={fontsize}>{minutes ?? '-'}</span>
                        <span>MINUTES</span>
                    </div>
                    <div class="timeBlock">
                        <span style={fontsize}>{seconds ?? '-'}</span>
                        <span>SECONDS</span> 
                    </div>
                </div>
                <span class="text" style={{'color': this.textcolour? this.textcolour : '#502669'}}> 
                    <time>{this.text}</time>
                </span>
            </div>
        );
    }
}