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
        const pCards = this.host.querySelectorAll('project-section')
        const pImages = this.host.querySelectorAll('project-section')

        //RETURN AN ARRAY OF HTML GRIDS
        return this.createGridsArray(pCards, pImages, pSections)
    }

    createGridsArray(pcs, pis, pss){
        //CHECK ALL ARRAYS ARE EQUAL
        //IF NOT, RENDER ERROR MSG

        //MAP THROUGH PSS, RETURN ARRAY OF GRIDS

    }

    createGrid(pc, pi, ps){
        //FOR EACH, WRAP EL IN A DIV WITH CORRECT CLASS

        //RETURN GRID

    }
    
    render() {

        const grids = this.prepareGrids();

        return { grids }
    }
}



