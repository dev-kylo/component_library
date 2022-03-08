import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'elections-tab',
    shadow: true
})
export class ElectionsTab {

    @Prop() tabtitle: string;
    @Prop() posts: string;
    @Prop() type: 'single' | 'multiple' | 'groupings';
    @Prop() combineresults: boolean;
    @Prop() active: boolean;
    @Prop() injectcandidates: string;

    render() {
        return null
    }
}