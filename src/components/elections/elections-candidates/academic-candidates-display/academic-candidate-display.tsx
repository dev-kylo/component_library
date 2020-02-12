import { Component, h, Prop, State} from '@stencil/core';


@Component({
    tag: 'academic-candidate-display',
    styleUrl: 'academic-candidate-display.css',
    shadow: true
})

export class AcademicCandidateDisplay {

    @Prop() data;

    @State() activePosition;

    // @Event() activeData: EventEmitter;

    @State() current;

    createSubLinks(){
        let positions = [];
        let nodes = []
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
        console.log("data from click handler")
        console.log(e)
        console.log(e.target.textContent)
        this.current = e.target.textContent
        // this.activePosition = data;
    }

    // @Listen('activeData') 
    // seeNow(event){
    //     console.log(event.detail)
    // }
    
    render() {
        let candidates = !this.current ? '' : <candidate-display data={this.data.filter(candidate => candidate.Post === this.current)}></candidate-display>;
        return (
            <div>
                <div class="positions">
                    <flex-container alignx="center" wrap>
                        {this.createSubLinks()}
                    </flex-container>
                </div>
                {candidates}
            </div>
        );
    }
}