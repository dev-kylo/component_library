import { Component, h, Element, Prop } from '@stencil/core';
import { createArrayFromString } from '../../../utils/utils';


@Component({
    tag: 'project-page',
    styleUrl: 'project-page.css',
    shadow: true
})
export class ProjectPage {

    @Element() host: HTMLElement;
    /** The colours for the background & text of <project-heading>, separated with a comma. eg "text colour, bg colour" */
    @Prop() colourscheme: string = "";
    /** The colours for the <h1> heading, separated with a comma. eg "h1 colour, bg colour" */
    @Prop() pagetitlecolours: string = "";
    

    prepareGrids(){
        //THIS FETCHES EACH ARRAY OF PROJECT COMPONENT TYPE
        const pSections = this.host.querySelectorAll('project-heading')
        const pCards = this.host.querySelectorAll('project-card')
        const pImages = this.host.querySelectorAll('project-image')

        //RETURN AN ARRAY OF HTML GRIDS
        return this.createGridsArray(pCards, pImages, pSections);
    }

    // createArrayFromNode(nodeAr => Array.prototype.split(nodeAr))

    createGridsArray(pcs, pis, pss){
        //CHECK ALL ARRAYS ARE EQUAL
        //IF NOT, RENDER ERROR MSG

        //MAP THROUGH PSS, RETURN ARRAY OF GRIDS
        const grids = [];
        for (let i= 0; i < pss.length; i++){
            grids.push(this.createGrid(pcs[i], pis[i], pss[i], i))
        }
        const el = <div><slot name="socials"></slot></div>;
        grids.push(el)
        return grids;
    }

    createGrid(card, image, section, int){
        //FOR EACH, PROVIDE A SLOT NAME SO COMPONENTS RENDER IN CORRECT POSITION;
        // section.slot = "section"
        const sectionSlot = `section${int}`;
        const imageSlot = `image${int}`;
        const cardSlot = `card${int}`;
        section.slot = sectionSlot;
        image.slot = imageSlot;
        card.slot = cardSlot;

        //GIVE EACH SECTION A COLOUR SCHEME
        section.colourscheme = this.colourscheme;
        section.pagetitlecolours = this.pagetitlecolours;
        const bgscheme: string[] = createArrayFromString(this.colourscheme, ',');
        const bgcolour = {
            "background-color": bgscheme[1] || "#502669",
        }

        return (
            <div class="grid">
                <div style={bgcolour} class="section">
                    <slot name={sectionSlot}></slot>
                </div>
                    <div class="card">
                        <slot name={cardSlot}></slot> 
                    </div>
                <div class="image">
                    <slot name={imageSlot}></slot>
                </div>
            </div>
        )
    }
    
    render() {

        const grids = this.prepareGrids();

        return grids ?? null
    }
}



