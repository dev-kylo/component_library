export type Preset = {
    name: string;
    id: string;
    dimensions: string;
    width: number,
    height: number
}

export const presets:Preset[] = [
    {
        name: 'Home Banner',
        id: 'Home_Banner',
        dimensions: '780 x 600',
        width: 780,
        height: 600
    },
    {
        name: 'Event Card',
        id: 'Event_Card',
        dimensions: '1032 x 583',
        width: 1032,
        height: 583
    },
    {
        name: 'Page Banner',
        id: 'Page_Banner',
        dimensions: '1280 x 600',
        width: 1280,
        height: 600
    },
    {
        name: 'Product',
        id: 'Product_Image',
        dimensions: '800 x 1000',
        width: 800,
        height: 1000
    },
    {
        name: 'Standard',
        id: 'Image_Medium',
        dimensions: '800 x auto',
        width: 800,
        height: 0
    },
    {
        name: 'Venue Banner',
        id: 'Venue_Banner',
        dimensions: '1000 x 1000',
        width: 1000,
        height: 1000
    },
    {
        name: 'Gallery Square',
        id: 'Gallery_Square',
        dimensions: '400 x 400',
        width: 400,
        height: 400
    },
    {
        name: 'Home Advert',
        id: 'Home_Advert',
        dimensions: '1200 x 400',
        width: 1200,
        height: 400
    },
];