import { Component, h, Prop, Element } from '@stencil/core';


@Component({
    tag: 'scroll-observer',
    styleUrl: 'scroll-observer.css',
})
export class ScrollObserver {

    /** Select the animation name for the child component on intersection. Choose from list of supplied animations */
    @Prop() animation: string = 'scaleIn';
    /** If true, the component will render a child lazy-image  */
    @Prop() lazyimage: boolean;

    @Element() host: HTMLElement;

    private observer: IntersectionObserver;

    componentDidLoad(){
      const child = this.host.firstElementChild as HTMLElement;
      const options = { rootMargin: '10px 0px' }
      if (child) {
          //CHECK FOR OBSERVER IN BROWSER
            if(!!window.IntersectionObserver){
                this.observer = new IntersectionObserver(entries => this.onIntersection(entries), options);
                this.observer.observe(child);
            }
            else if (child.hasAttribute('data-src')) {
                //IF NO OBSERVER, SET THE SRC IF CHILD IS AN IMAGE
                child.setAttribute('src', child.getAttribute('data-src'));
            }
      }
    }

    onIntersection(entries){
        for (const entry of entries){
            if (entry.isIntersecting){
                if (this.observer) this.observer.disconnect();
                if (entry.target.getAttribute('data-src')){
                    //APPLIES TO LAZY IMAGES ONLY
                    entry.target.setAttribute('src', entry.target.getAttribute('data-src'));
                    entry.target.removeAttribute('data-src');
                }
                if (this.animation) entry.target.classList.add(this.animation);
            }
        }
    }
    
    render() {
        return (
            <slot></slot>
        );
    }
}