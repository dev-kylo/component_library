import { KclsuModal } from './kclsu-modal';
import { ModalBackdrop } from './modal-backdrop';
import { newSpecPage } from '@stencil/core/testing';

describe('<kclsu-modal>', () => {
    it('if "show" prop is true, then the modal backdrop will set its "showbg" prop to true', async () => {
        const page =  await newSpecPage({
            components: [KclsuModal],
            html: `<kclsu-modal></kclsu-modal>`
        })

        page.rootInstance.show = true;
        await page.waitForChanges();

        expect(page.root.shadowRoot.querySelector('modal-backdrop').getAttribute('showbg')).toEqual('');
    })

})

describe('<modal-backdrop>', () => {

    let page;

    beforeEach(async () => {
            page =  await newSpecPage({
            components: [ModalBackdrop],
            html: `<modal-backdrop showbg=true></modal-backdrop>`
        })
    })

    it('invokes a click function when the bg is clicked', async () => {

        let clickSpy = jest.fn();
        const bg = page.root.querySelector('.Backdrop');
        page.win.addEventListener('exitModal', clickSpy);

        bg.click();
        await page.waitForChanges();

        expect(clickSpy).toHaveBeenCalledTimes(1);
        
    })

    it('does not show a modal when the showbg prop is false', async () => {
        page.root.showbg = false;
        await page.waitForChanges();
        expect(page.root.querySelector('.Backdrop')).toBeFalsy();
    })

})