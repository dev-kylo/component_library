import { Component, h, State } from '@stencil/core';


@Component({
    tag: 'varsity-weather',
    styleUrl: 'varsity-weather.css',
    shadow: true
})
export class VarsityWeather {

    @State() weather;
    @State() icon;

    componentDidLoad(){
        let url = `http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=f5232ab01a2915f5e741067aa0514bb4`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.weather = {
                    description: data.weather[0].description,
                    main: data.weather[0].main,
                    clouds: data.clouds.all,
                    temperature: data.main.temp
                };
                this.icon= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            }) 
            .catch(er => {
                console.log("Weather not fetched");
                console.log(er)
            })             
    }
    
    render() {
        if(this.weather){
            return (
                <flex-container aligny="center" alignx="space-between" fillContainer>
                    <div class="info">
                        <span><em>What to expect:</em> {this.weather.description}</span>
                        <span><em>Temp:</em> {this.weather.temperature}</span>
                        <span><em>Cloud %:</em> {this.weather.clouds}</span>
                    </div>
                    <div class="icon">
                        <img src={this.icon} alt={this.weather.main}></img>
                    </div>
                </flex-container>
    
            );
        }
        else return (
            <flex-container aligny="center" alignx="space-between" fillContainer>
                <div class="info"><span>
                    <em>What to expect:</em> broken clouds</span><span><em>Temp:</em> 283.26</span>
                    <span><em>Cloud %:</em> 75</span>
                </div>
                <div class="icon">
                    <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="Clouds"></img>
                </div>
            </flex-container>
        )
    }
}