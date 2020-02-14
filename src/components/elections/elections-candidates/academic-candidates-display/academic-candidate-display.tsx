import { Component, h, Prop, State, Element} from '@stencil/core';


@Component({
    tag: 'academic-candidate-display',
    styleUrl: 'academic-candidate-display.css',
    shadow: true
})

export class AcademicCandidateDisplay {

    @Prop() data;

    @State() activePosition;
    @State() current;

    @Element() host: HTMLElement;


    createSubLinks(){
        let positions = [];
        let nodes:HTMLSpanElement[] = []
        if (this.data){
            for (let x = 0; x < this.data.length; x++){
                let current = this.data[x];
                if (!positions.find(p => p === current.Post)){
                let link = <span data-candidates={current}  onClick={ e => this.clickHandler(e)}>{current.Post}</span>
                    positions.push(current.Post);
                    nodes.push(link)
                }
            }
            return nodes;
        }
    }


    clickHandler(e){
        this.current = e.target.textContent;
        let collection:HTMLCollection = e.target.parentNode.children;
        for(let x = 0; x < collection.length; x++){
           collection[x].setAttribute('style', 'font-weight:  ')
        }
         e.target.style.fontWeight = 'bold';
   
    }

    
    render() {
        let candidates = !this.current ? '' : <candidate-display data={this.data.filter(candidate => candidate.Post === this.current)}></candidate-display>;
        return (
            <div>
                <div class="positions">
                    <div class="submenu">
                        {this.createSubLinks()}
                    </div>
                </div>
                {candidates}
            </div>
        );
    }
}