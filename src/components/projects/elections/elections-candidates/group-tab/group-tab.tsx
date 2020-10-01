import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'group-tab',
    shadow: true
})
export class GroupTab {

    @Prop() tabtitle: string;
    @Prop() searchterms: string;
    @Prop() regex: string;
    @Prop() replace: string;
    @Prop() active: boolean;
    
    render() {
        return null
    }
}