import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'post-grouping',
    shadow: true
})
export class PostGrouping {

    @Prop() tabtitle: string;
    @Prop() searchterms: string;
    @Prop() regex: string;
    @Prop() replace: string;
    
    render() {
        return (
            <p>My name is Stencil</p>
        );
    }
}