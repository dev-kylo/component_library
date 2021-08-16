import { CookieModal } from './cookie-modal';
import { newSpecPage } from '@stencil/core/testing';


const cookieModal = new CookieModal();

describe('Cookie Modal', () => {

    it('should set the cookie and return the cookiename in an array', async () => {
        cookieModal.config = {'cookietest': () => {}}
        let consented  = cookieModal.applyCookieSetter([{data: { cookiename: 'test'}}]);

        expect(consented).toEqual(['cookietest']);
    })

    it('the component should set a cookie with the provided config', async () => {
        let config = {'test': () => {}};
        const page = await newSpecPage({
            components: [CookieModal],
            html: `<cookie-modal config=${config}>
                    </cookie-modal>`
        });

        page.rootInstance.setConsentCookie(['kclsutest'])

        expect(page.doc.cookie).toContain(cookieModal.cookiename);
        expect(page.rootInstance.getCookie('kclsutest')).toEqual('true')

    })

    it('the fetchAcceptedCookies method should return an array of checked input values', async () => {
        let config = {'test': () => {}};
        const page = await newSpecPage({
            components: [CookieModal],
            html: `<cookie-modal config=${config}>
                        <slot name="cookieoptions">
                            <input type="checkbox" value="checked" checked />
                            <input type="checkbox" value="alsochecked" checked />
                            <input type="checkbox" value="alsochecked" />
                        </slot>
                    </cookie-modal>`
        });

        expect(page.rootInstance.fetchAcceptedCookies()).toHaveLength(2);

    })

})