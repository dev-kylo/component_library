import { Component, h, Prop, Element, State } from '@stencil/core';


@Component({
    tag: 'kclsu-search',
    styleUrl: 'kclsu-search.css',
    shadow: false
})
export class KclsuSearch {

    /** If searching an HTML element, provide the element's selector - tag, class or id */
    @Prop() selector: string;
     /** If searching an custom web component, provide the name of the atrribute to query*/
    @Prop() attr: string;
    /** The container of the search result / search field, used to hide the element from results. Can be a tag, class or id */
    @Prop() containerselector!: string;
    /** The text inside the search input, which disappears once a user starts typing */
    @Prop() placeholdertext: string = "search...";

    @State() noResults: boolean = false;
    @State() containers;

    @Element() host:HTMLElement;

    componentDidLoad(){
        if(this.containers) return;
        let containers = this.host.querySelectorAll(this.containerselector);
        this.containers = containers;
    }


    inputHandler(e){
        let searchTerm = e.target.value;
        if (this.attr) this.searchByAttr(searchTerm.toLowerCase())
        else this.searchBySelector(searchTerm.toLowerCase());
    }

    searchBySelector(term){
        let parents = this.host.querySelectorAll(this.containerselector);
        parents.forEach(parent => {
            if(this.selector === this.containerselector){
                this.performSearch(parent, parent.textContent.toLowerCase(), term)
            }
            else {
                let searchable = parent.querySelector(this.selector);
                this.performSearch(parent, searchable.textContent.toLowerCase(), term) 
            }
            
        });
    }

    searchByAttr(term){ 
        let searchables = this.host.querySelectorAll(this.containerselector);
        searchables.forEach(item => {
            this.performSearch(item, item[this.attr].toLowerCase(), term)
        }) 
    }

    performSearch(container, searchable, term){
        container.classList.remove('hide')
        if(!searchable.includes(term)) container.classList.add('hide');
        this.checkForResults();
    }

    checkForResults(){
        let hidden = [];
        this.containers.forEach(cont => {
            if(cont.classList.contains('hide')){
                hidden.push(cont)
            }
        });
        if (hidden.length === this.containers.length) this.noResults = true;
        else {
            if (this.noResults) this.noResults = false;
        }
    }


    
    render() {
        let noresults = this.noResults?  (<span class="noresults">Nope, can't seem to find what you're looking for...</span>) : '';
        return ([
            <flex-container alignx="center" aligny="center" fillcontainer>
                <input class="kclsu_search" placeholder={this.placeholdertext} type="text" onInput={e => this.inputHandler(e)}></input>
            </flex-container>,
            noresults,
            <slot></slot>
        ]);
    }
}