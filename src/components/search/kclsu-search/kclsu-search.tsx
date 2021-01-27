import { Component, h, Prop, Element, State } from '@stencil/core';


@Component({
    tag: 'kclsu-search',
    styleUrl: 'kclsu-search.css',
    shadow: true
})
export class KclsuSearch {

    /** If searching the text of an HTML element, provide the element's selector - tag, class or id */
    @Prop() selector: string;
     /** If searching an custom web component, provide the name of the atrribute to query*/
    @Prop() attr: string;
    /** The container of the search result / search field, used to hide the element from results. Can be a tag, class or id */
    @Prop() containerselector!: string;
    /** The text inside the search input, which disappears once a user starts typing */
    @Prop() placeholdertext: string = "search...";

    //Will display a No Results message when toggled.
    @State() noResults: boolean = false;

    @Element() host:HTMLElement;

    inputHandler(e): void{
        let searchTerm = e.target.value;
        if (this.attr) this.searchByAttr(searchTerm.toLowerCase())
        else this.searchBySelector(searchTerm.toLowerCase());
    }

    searchBySelector(term: string): void{
        let parents = this.host.querySelectorAll(this.containerselector);
        parents.forEach(parent => {
            if(this.selector === this.containerselector)
                this.performSearch(parent, parent.textContent.toLowerCase(), term);
            else {
                let searchable = parent.querySelector(this.selector);
                this.performSearch(parent, searchable.textContent.toLowerCase(), term) 
            }
        });
    }

    searchByAttr(term: string): void{ 
        let searchables = this.host.querySelectorAll(this.containerselector);
        searchables.forEach(item => 
            this.performSearch(item, item[this.attr].toLowerCase(), term)); 
    }

    performSearch(container, searchable, term): void{
        container.classList.remove('hide')
        if(!searchable.includes(term)) container.classList.add('hide');
        this.checkForResults();
    }

    checkForResults():void{
        let containers = this.host.querySelectorAll(this.containerselector);
        let hidden = [];
        containers.forEach(cont => {
            if (cont.classList.contains('hide')) hidden.push(cont);
        });
        if (hidden.length === containers.length) this.noResults = true;
        else if (this.noResults) this.noResults = false;
    }


    
    render() {
        let noresults = this.noResults?  (<span class="noresults">Nope, can't seem to find what you're looking for...</span>) : '';
        return ([
            <flex-container alignx="center" aligny="center">
                <input class="kclsu_search" placeholder={this.placeholdertext} type="text" onInput={e => this.inputHandler(e)}></input>
            </flex-container>,
            noresults,
            <slot></slot>
        ]);
    }
}