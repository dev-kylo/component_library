import { Component, h, Prop, State, Element } from '@stencil/core';


@Component({
    tag: 'grouped-candidate-display',
    styleUrl: 'grouped-candidate-display.css',
    shadow: true
})

export class GroupedCandidates {

    @Prop() data;
    /** Using legacy data */
    @Prop() legacy = false;
    /** URL for a page to hold breakdowns, as a fallback option*/
    @Prop() fallbackbreakdownurl;
    /** URL for a page to hold breakdowns, as a fallback option*/
    @Prop() emitpostid: boolean = false;

    @State() activePosition;
    @State() current;
    @State() tabs;

    @Element() host: HTMLElement;

    lookup = {};


    componentDidLoad() {
        console.log(this.data)
        for (let x = 0; x < this.data.length; x++) {
            let current = this.data[x];
            let post = (current.Post.Title || current.Post).replace(/\s/g, "");
            if (post in this.lookup) {
                this.lookup[post].push(current);
            } else {
                this.lookup[post] = [current];
            }
        }

        this.createTabs();

    }


    createTabs() {
        let tabs: any = []
        for (let key in this.lookup) {
            let candidates = this.lookup[key];
            let post = candidates[0].Post.Title || candidates[0].Post;
            tabs.push(<tab-title name={key}>{post}</tab-title>)
            tabs.push(<tab-area name={key}>
                <candidate-display fallbackbreakdownurl={this.fallbackbreakdownurl} emitpostid={this.emitpostid} legacy={this.legacy} data={candidates}></candidate-display>
            </tab-area>);
        }

        this.tabs = tabs;
    }


    render() {


        if (this.tabs) {
            return (
                <kclsu-tabs variant='tertiary'>
                    {this.tabs}
                </kclsu-tabs>
            );
        }
        else return ''
    }
}