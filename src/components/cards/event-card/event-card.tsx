import { Component, Prop, h, Element, Event, EventEmitter, Method } from '@stencil/core';

@Component({
    tag: 'event-card',
    styleUrl: 'event-card.css',
    shadow: true
})

export class ProfileCard {
    /** The title for the card - usually a full name */
    @Prop() cardtitle: string;
    /** A sub heading - usually the date*/
    @Prop() date: string;
    /** The URL link for the primary text link on the bottom left of the card*/
    @Prop() link: string;
    /** The ID string for click events, using Stencil's Emitter. Only applies to card's bottom right link- DEVELOPER USE */
    @Prop() emitid: string;
    /** A call back function to be supplied for the first (left hand side) call to action, as well as the clickable name  */
    @Prop() primaryfn: () => void;
    /** The image URL */
    @Prop() image: string;
    /** Applies to lazy loading of images. Remove lazy loading */
    @Prop() nolazy: boolean = false;
    /** Specifiy which part of the image to focus on. Defaults to center */
    @Prop() imagefocus: 'center' | 'top' | 'bottom' | 'right' | 'left' | 'faces' = 'center'

    @Element() host: HTMLElement;

    @Event() emitClick: EventEmitter;

    clickHandler(e: Event, cb: () => void) {
        e.preventDefault();
        if (cb) cb();
        else if (this.emitid) this.emitClick.emit(this.emitid)
    }

    keyDownHandler(e: KeyboardEvent, cb: () => void) {
        if (e.code === 'Enter') {
            if (cb) cb();
            else if (this.emitid) this.emitClick.emit(this.emitid)
        }
    }

    @Method()
    async addFocus() {
        const firstLink = this.host.shadowRoot.querySelector('a');
        if (firstLink) firstLink.focus();
    }


    render() {

        return (
            <div class="event-card-wrapper">
                <div class="event-card">
                    <a tabIndex={-1} target="_blank" rel="noopener noreferrer" class="titlelink" href={this.link}>
                        <div class="image">
                            <lazy-image
                                nolazy={this.nolazy}
                                animatein
                                image={this.image || 'https://res.cloudinary.com/kclsu-media/image/upload/f_auto,fl_any_format,g_center,q_100/v1581516201/website_uploads/KCLSU%20Brand/Bzcl1r6L_400x400_se7grm.jpg'}
                                mobile="90"
                                desktop="20"
                                focusarea={this.imagefocus}
                                customtransform="g_face"
                                minwidth="300"
                            ></lazy-image>
                        </div>
                    </a>
                    <div class="contentBox">
                        <span class="date">{this.date}</span>
                        <a target="_blank" rel="noopener noreferrer" class="titlelink" href={this.link}><span class="name">{this.cardtitle}</span></a>
                    </div>
                </div>
            </div>
        );
    }
}
