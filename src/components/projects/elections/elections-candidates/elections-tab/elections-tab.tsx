import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'elections-tab',
    shadow: true
})
export class ElectionsTab {

    @Prop() tabtitle: string;
    @Prop() posts: string;
    @Prop() type: 'single' | 'multiple' | 'groupings';
    @Prop() combineResults: boolean;
    @Prop() active: boolean;
    @Prop() shortentitles: boolean;
    
    render() {
        return null
    }
}