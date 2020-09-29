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
                let post = current.Post.Title || current.Post;
                if (!positions.find(p => p.trim() === post.trim())){
                let link = <li role="tab" id={post} data-candidates={current} class="academic_sub" aria-selected="false" onClick={ e => this.clickHandler(e)}>{post}</li>
                    positions.push(post);
                    nodes.push(link)
                }
            }
            return nodes;
        }
    }


    clickHandler(e){
        e.preventDefault();
        this.current= '';
        let collection:HTMLCollection = e.target.parentNode.children;
        for(let x = 0; x < collection.length; x++){
           collection[x].setAttribute('style', 'color:  #502669');
           collection[x].setAttribute('aria-selected', 'false');
        }
         e.target.style.color = '#e45b2c';
         e.target.setAttribute('aria-selected', 'true');
         this.current = e.target.textContent;
    }

    
    render() {
        let candidates = !this.current ? '' : <candidate-display 
                                                    data={this.data.filter(candidate => {
                                                        let title = candidate.Post.Title || candidate.Post;
                                                        return title.trim() === this.current.trim()
                                                    })}
                                              ></candidate-display>;
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