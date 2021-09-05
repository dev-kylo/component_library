import { Component, Prop, h, State} from '@stencil/core';

@Component({
  tag: 'campaign-news',
  shadow: false
})

export class CampaignNews {

  /** The MSL organisation ID where the news is kept - filled in automatically by campaign-tabs parent */
  @Prop()newsid: string;
  @State() data;

  componentDidLoad() {
    if (this.newsid){
      let url = `https://kclsu-heroku.herokuapp.com/newslist/${this.newsid}`
      fetch(url)
          .then(res => res.json())
          .then(newsData => {
              this.data = newsData;
          })
          .catch(er => console.log(er))
    }
  }

  render() {
    let news;
    if (this.data <= 0  || !this.data) news = <p>There is no current news.</p>
    else news = this.data.map(ob => <news-card newstitle={ob.Title} newslink={ob.Url} ></news-card>)

    return (
        <div>
          {news}
        </div>
    );
  }
}
