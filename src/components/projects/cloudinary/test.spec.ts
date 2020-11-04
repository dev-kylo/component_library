import { CloudinaryApp } from './cloudinary-app';
import { newSpecPage } from '@stencil/core/testing';

declare const global:any;

describe('Cloudinary App', ( ) => {
    it('if public_id is provided, it should display an image', async () => {
         let app = await newSpecPage({
            components: [CloudinaryApp],
            html: `<cloudinary-app></cloudinary-app>`
        })
        app.rootInstance.public_id = "temporary/Screenshot_2020-05-06_at_17.09.28_ypsftq";
        await app.waitForChanges();
        expect(app.root.shadowRoot.querySelector('img')).toBeTruthy();
    })

    it('if public_id is provided, the presets should show', async () => {
        let app = await newSpecPage({
           components: [CloudinaryApp],
           html: `<cloudinary-app></cloudinary-app>`
       })
       expect(app.root.querySelector('preset-controls')).toBeFalsy();
       app.rootInstance.public_id = "temporary/Screenshot_2020-05-06_at_17.09.28_ypsftq";
       await app.waitForChanges();
       expect(app.root.shadowRoot.querySelector('preset-controls')).toBeTruthy();
   })

//     it('should make a fetch call each time the public_id is updated', async () => {
//       // Arrange
//         const fetchMock = jest.fn().mockImplementation( _ => {
//             return Promise.resolve({
//                 ok: true,
//                 json: jest.fn().mockImplementation(() => Promise.resolve({}))
//             });
//         });

//         Object.defineProperty(global, 'fetch', {
//             value: fetchMock,
//             writable: true
//         });
        

//         const page = await newSpecPage({
//         components: [CloudinaryApp],
//         html: `<cloudinary-app public_id="inititalcloudinaryid"></cloudinary-app>`
//         });

//         expect(fetchMock).toHaveBeenCalledWith('https://kclsu-heroku.herokuapp.com/transform', {
//             "body": "{\"transformations\":{\"preset\":\"\"},\"publicId\":\"inititalcloudinaryid\"}",
//             "credentials": "same-origin",
//             "headers": {
//                 "Content-Type": "application/json",
//             },
//             "method": "POST",
//         });

//         page.rootInstance.public_id = 'updated_id' ;
//         await page.waitForChanges();
    
//         expect(fetchMock).toHaveBeenCalledWith('https://kclsu-heroku.herokuapp.com/transform', {
//             "body": "{\"transformations\":{\"preset\":\"\"},\"publicId\":\"updated_id\"}",
//             "credentials": "same-origin",
//             "headers": {
//                 "Content-Type": "application/json",
//             },
//             "method": "POST",
//         });
//    })
})