import { Component, Prop, h} from '@stencil/core';


@Component({
    tag: 'loading-spinner',
    styleUrl: 'loading-spinner.css',
    shadow: true
})

export class LoadingSpinner {
    /** Display the spinner */
    @Prop() show: boolean = true;
    /** Set margin of spinner*/
    @Prop() margin: string = 'auto';
    
    render() {

        const margin = {
            margin: this.margin
        }

        if(!this.show) return ''
         else return (
            <div style={margin} id="spinner-container">
                <div id="spinner">
                    <div class="cssload-loader">
                        <div class="cssload-inner cssload-one"></div>
                        <div class="cssload-inner cssload-two"></div>
                        <div class="cssload-inner cssload-three"></div>
                    </div>
                </div>
            </div>
        );
    }
};