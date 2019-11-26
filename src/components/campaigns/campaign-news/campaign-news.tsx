import { Component, Prop, h, State} from '@stencil/core';

@Component({
  tag: 'campaign-news',
  shadow: false
})

export class CampaignNews {

  @Prop()newsid: string;
  @State() data;

  componentDidLoad() {
    fetch(' http://kclsu.org/svc/feeds/news/6013?subtree=true')
        .then(res => res.json())
        .then(newsData => {
            this.data = newsData;
        })
  }

  render() {
      console.log(this.data)
    return (
        <h1>Campaign News</h1>
    );
  }
}
