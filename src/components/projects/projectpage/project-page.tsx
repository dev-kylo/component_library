import { Component, h, Element } from '@stencil/core';


@Component({
    tag: 'project-page',
    styleUrl: 'project-page.css',
    shadow: true
})
export class ProjectPage {

    @Element() host: HTMLElement;
    

    prepareGrids(){
        //THIS FETCHES EACH ARRAY OF PROJECT COMPONENT TYPE
        const pSections = this.host.querySelectorAll('project-section')
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
        return grids;
    }

    createGrid(card, image, section, int){
        //FOR EACH, WRAP EL IN A DIV WITH CORRECT CLASS;
        // section.slot = "section"
        const sectionSlot = `section${int}`;
        const imageSlot = `image${int}`;
        const cardSlot = `card${int}`;
        section.slot = sectionSlot;
        image.slot = imageSlot;
        card.slot = cardSlot;

        return (
            <div class="grid">
                <div class="section">
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



