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
                console.log(data)
                this.weather = {
                    description: data.weather[0].description,
                    main: data.weather[0].main,
                    clouds: data.clouds.all,
                    temperature: data.main.temp
                };
                this.icon= `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            })              
    }
    
    render() {
        console.log(this.weather)
        console.log(this.weather)
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
}