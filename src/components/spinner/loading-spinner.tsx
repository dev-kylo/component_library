import { Component, Prop, h} from '@stencil/core';


@Component({
    tag: 'loading-spinner',
    styleUrl: 'loading-spinner.css',
    shadow: true
})

export class LoadingSpinner {

    @Prop() show: boolean = true;
    
    render() {

        if(!this.show) return ''
         else return (
            <div id="spinner-container">
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