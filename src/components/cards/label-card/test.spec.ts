import { LabelCard } from './label-card';
import { newSpecPage } from '@stencil/core/testing';

describe('<label-card>', () => {

    it('displays a button instead of text, if a button link is provided', async () => {
        const page =  await newSpecPage({
            components: [LabelCard],
            html: `<label-card cardtitle='title' buttonlink='/'></label-card>`
        })

        expect(page.root.shadowRoot.querySelector('kclsu-button')).toBeTruthy();
        expect(page.root.shadowRoot.querySelector('p')).toBeFalsy();
    })

    it('displays text with no button, even if button text is provided', async () => {
        const page =  await newSpecPage({
            components: [LabelCard],
            html: `<label-card cardtitle='title' text="some text" buttontext='Click me'></label-card>`
        })

        expect(page.root.shadowRoot.querySelector('kclsu-button')).toBeFalsy();
        expect(page.root.shadowRoot.querySelector('p')).toBeTruthy();
    })

})

