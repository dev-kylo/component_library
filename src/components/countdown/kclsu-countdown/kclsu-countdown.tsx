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
    @Prop() text: string;
    /** The width of the countdown clock - in Pixels ONLY */
    @Prop() width: string;
    /** The margin of the countdown clock */
    @Prop() margin: string;
    /** Give the message text a white block background */
    @Prop() msgbg: boolean;


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

        const clockStyle = {} as any;
        const timeTextStyle = {} as any;
        const timeNumberStyle = {} as any;
        const textStyle = {} as any;

        const width = this.width;
        if (this.width) {
            const newWidth = width.replace('px', '');
            clockStyle.maxWidth = this.width;
            clockStyle.minWidth = '300px'
            if (+newWidth < 600){
                timeTextStyle.fontSize = '0.6em';
                timeTextStyle.padding = '0.25em;';
                timeNumberStyle.fontSize = '2em';
                timeNumberStyle.padding = '0.25em;';
            }
        };
        if (this.margin) clockStyle.margin = this.margin;
        if (this.msgbg){
            textStyle.backgroundColor = 'white';
            textStyle.margin = '0.2em';
            textStyle.padding = '0.2em';
        } 
        if (this.textcolour) textStyle.color = this.textcolour;
        return (
            <div class="countdown" style={clockStyle}>
                <div class="flex">
                    <div class="timeBlock">
                        <span style={timeNumberStyle}>{days ?? '-'}</span>
                        <span style={timeTextStyle}>DAYS</span>
                    </div>
                    <div class="timeBlock">
                        <span style={timeNumberStyle}>{hours ?? '-'}</span>
                        <span style={timeTextStyle}>HOURS</span>  
                    </div>
                    <div class="timeBlock">
                        <span style={timeNumberStyle}>{minutes ?? '-'}</span>
                        <span style={timeTextStyle}>MINUTES</span>
                    </div>
                    <div class="timeBlock">
                        <span style={timeNumberStyle}>{seconds ?? '-'}</span>
                        <span style={timeTextStyle}>SECONDS</span> 
                    </div>
                </div>
                <span class="text" style={textStyle}> 
                    <time>{this.text}</time>
                </span>
            </div>
        );
    }
}