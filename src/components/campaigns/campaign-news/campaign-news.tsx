import { Component, Prop, h, State} from '@stencil/core';

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

  render() {
    console.log("Component Did Load Method")
    console.log(this.data)
    let news = this.data.map(ob => <news-card newstitle={ob.Title} newslink={ob.Url} ></news-card>)

    return (
        <div>
          {news}
        </div>
    );
  }
}
