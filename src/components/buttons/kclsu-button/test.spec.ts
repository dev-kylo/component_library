import { KclsuButton } from './kclsu-button';
import { newSpecPage } from '@stencil/core/testing';

const button = new KclsuButton();

describe('Kclsu Button', () => {
    it('should have prop "small" set to undefined', () => {
        expect(button.small).toBe(undefined);
    })

    it('should display the text between the tags', async () => {
        const page = await newSpecPage({
            components: [KclsuButton],
            html: `<kclsu-button link="/">My Button</kclsu-button>`
        });
        expect(page.root).toEqualText('My Button')
    })

    it('when given small prop it should render HTML with the small class added', async () => {
        const page = await newSpecPage({
            components: [KclsuButton],
            html: `<kclsu-button small link="/page">My Button</kclsu-button>`
        });
        expect(page.root).toEqualHtml(`
            <kclsu-button link="/page" small="">
                <mock:shadow-root>
                    <flex-container alignx="flex-start" fillcontainer="">
                        <a class="green small" href="/page" target="_self">
                            <slot></slot>
                        </a>
                     </flex-container>
                </mock:shadow-root>
                My Button
            </kclsu-button>
        `)
    })

    it('when given newtab and purple props it should render "a" tag with purple class, and new tab target', async () => {
        const page = await newSpecPage({
            components: [KclsuButton],
            html: `<kclsu-button purple newtab link="/page">My Button</kclsu-button>`
        });
        expect(page.root).toEqualHtml(`
            <kclsu-button link="/page" purple="" newtab="">
                <mock:shadow-root>
                    <flex-container alignx="flex-start" fillcontainer="">
                        <a class="purple big" href="/page" target="_blank">
                            <slot></slot>
                        </a>
                     </flex-container>
                </mock:shadow-root>
                My Button
            </kclsu-button>
        `)
    })
})



