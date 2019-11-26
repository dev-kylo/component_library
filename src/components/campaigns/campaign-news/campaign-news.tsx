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
    fetch(' https://kclsu.org/svc/feeds/news/6013?subtree=true')
        .then(res => res.json())
        .then(newsData => {
            this.data = newsData;
        })
  }

  @Method()
  async fetchNews() {
    fetch(' https://kclsu.org/svc/feeds/news/6013?subtree=true')
    .then(res => res.json())
    .then(newsData => {
        this.testdata = newsData;
    })
  }


  render() {
    console.log("Component Did Load Method")
    console.log(this.data)

    const ell = document.querySelector('campaign-news');
    ell.fetchNews();
    console.log("Method data")
    console.log(this.testdata)

    return (
        <h1>Campaign News</h1>
    );
  }
}
