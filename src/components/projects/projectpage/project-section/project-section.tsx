import { Component, h, Prop } from '@stencil/core';


@Component({
    tag: 'project-section',
    styleUrl: 'project-section.css',
    shadow: true
})


export class ProjectSection {

    @Prop() pagetitle: string;
    @Prop() heading: string;
    @Prop() text: string;
    
    render() {
        const pagetitle  = (
            <div class="heading">
                <h1>{this.pagetitle}</h1>
            </div>
        ); 

        console.log(this.heading)
        return (
                <flex-container alignx="center" aligny="center" fillcontainer>
                    <section>
                        {this.pagetitle && pagetitle}
                        <h2>{this.heading}</h2>
                        <p>{this.text}</p>
                        <slot></slot>
                    </section>
                </flex-container>
            );
    }
}