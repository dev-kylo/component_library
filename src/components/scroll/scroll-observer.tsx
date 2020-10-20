import { Component, h, Prop, Element } from '@stencil/core';


@Component({
    tag: 'scroll-observer',
    styleUrl: 'scroll-observer.css',
})
export class ScrollObserver {

    @Prop() animation: string = 'scaleIn';
    @Prop() lazyimage: boolean;

    @Element() host: HTMLElement;

    private observer: IntersectionObserver;

    componentDidLoad(){
      const child = this.host.firstElementChild as HTMLElement;
      const options = { rootMargin: '10px 0px' }
      if (child) {
          this.observer = new IntersectionObserver(entries => this.onIntersection(entries), options);
          this.observer.observe(child);
      }
    }

    onIntersection(entries){
        for (const entry of entries){
            if (entry.isIntersecting){
                if (this.observer) this.observer.disconnect();
                if (entry.target.getAttribute('data-src')){
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