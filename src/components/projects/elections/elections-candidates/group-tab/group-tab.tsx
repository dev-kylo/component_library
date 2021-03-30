import { Component, Prop } from '@stencil/core';


@Component({
    tag: 'group-tab',
    shadow: true
})
export class GroupTab {

    /** The title for the tab for this group */
    @Prop() tabtitle: string;
    @Prop() searchterms: string;
    @Prop() regex: string;
    @Prop() replace: string;
    /** Set this Group Tab as the active tab */
    @Prop() active: boolean;
    /** The exact post names as appeared in MSL, separated by a pipe character | */
    @Prop() exclude: string;
    
    render() {
        return null
    }
}