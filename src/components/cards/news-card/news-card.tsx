import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'news-card',
  shadow: false
})

export class NewsCard {

  @Prop() newslink: string;
  @Prop() newstitle: string;

  render() {
    return (

        <div class="newsHome news_1col news_full large_image">
            <div class="item1 news_item itemOdd">
                <div class="news_item_inner">
                    <div class="news_item_hook"></div>
                    <h5><a href={this.newslink}> {this.newstitle} </a></h5>
                    <span class="news_image"></span>
                </div>
            </div>
        </div>
    );
  }
}
