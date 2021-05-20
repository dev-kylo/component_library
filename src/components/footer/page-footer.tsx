import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'page-footer',
    styleUrl: 'footer.scss', 
    shadow: true
})

export class PageFooter {

    @Prop() bgcolor: string = 'orange';
    @Prop() textcolor: string = 'white';
    @Prop() logo: string;
    @Prop() colone: string;
    @Prop() coltwo: string;
    @Prop() colthree: string;
    
    render() {

        const theme = {
            backgroundColor: this.bgcolor,
            color: this.textcolor
        };

        return (
            <section style={theme}>
                <div id="logo">
                    <lazy-image image={this.logo}></lazy-image>
                </div>

		        <div id="col1">
				    <h3>{this.colone}</h3>
                    <slot name="col1"></slot>
			    </div>
	
			    <div id="col2">
				    <h3>{this.coltwo}</h3>
                    <slot name="col2"></slot>
			    </div>
	
                <div id="col3">
                    <h3>{this.colthree}</h3>
                    <slot name="col3"></slot>
                </div>
            </section>
        );
    }
}