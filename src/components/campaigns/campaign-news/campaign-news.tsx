import { Component, Prop, h, State, Method} from '@stencil/core';

@Component({
  tag: 'campaign-news',
  shadow: false
})

export class CampaignNews {

  @Prop()newsid: string;
  @State() data;
  @State() testdata;

  componentDidLoad() {
    fetch('https://kclsu-heroku.herokuapp.com/newslist/17592')
        .then(res => res.json())
        .then(newsData => {
            this.data = newsData;
        })
  }

  @Method()
  async fetchNews() {
    fetch('https://kclsu-heroku.herokuapp.com/newslist/17592')
    .then(res => res.json())
    .then(newsData => {
        this.testdata = newsData;
    })
  }


  render() {
    console.log("Component Did Load Method")
    console.log(this.data)

    return (
        <h1>Campaign News</h1>
    );
  }
}
