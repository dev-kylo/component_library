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
                let link = <li role="tab" id={current.Post} data-candidates={current} class="academic_sub" aria-selected="false" onClick={ e => this.clickHandler(e)}>{current.Post}</li>
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
           collection[x].setAttribute('style', 'color:  #502669');
           collection[x].setAttribute('aria-selected', 'false');
        }
         e.target.style.color = '#e45b2c';
         e.target.setAttribute('aria-selected', 'true');
   
    }

    
    render() {
        let candidates = !this.current ? '' : <candidate-display data={this.data.filter(candidate => candidate.Post === this.current)}></candidate-display>;
        return (
            <div role="presentation">
                <div class="positions" role="presentation">
                    <ul class="submenu" role="tablist">
                        {this.createSubLinks()}
                    </ul>
                </div>
                <section role="tabpanel" aria-labelledby={this.current}>
                    {candidates}
                </section>
            </div>
        );
    }
}