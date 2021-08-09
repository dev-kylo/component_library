import { format, createArrayFromString, shuffleArray } from './utils';

describe('format', () => {
  it('returns empty string for no names defined', () => {
    expect(format(undefined, undefined, undefined)).toEqual('');
  });
});

describe('createArrayFromString()', () => {
  it('returns an array of substrings from the original string', async () => {
    const str1 = 'One, Happy, Team';
    const str2 = 'The President of the United States';
    const str3 = "Guys Campus, Bush House!, President's Wreath";
    const str4 = "Guys Campus| Bush House!| President's Wreath, Circus | The Anime Society";
   
    expect(createArrayFromString(str1, ',')).toHaveLength(3)
    expect(createArrayFromString(str2, ',')).toHaveLength(1)
    expect(createArrayFromString(str3, ',')[0]).toEqual('Guys Campus')
    expect(createArrayFromString(str4, '|')).toHaveLength(4);
  })
})

describe('shuffleArray()', () => {
  it ('returns the array in a random order', async () => {
    const ar = [1 ,2 , 3, 4, 5, 6];
    const copy = [...ar];
    shuffleArray(ar);
    expect(ar).toHaveLength(6);
    expect(ar).not.toBe(copy);

  })
})

// describe('Fetching Element Attrs', () => {
//   it('returns a an array of attributes + values', async () => {
//     const page = await newSpecPage({
//       components: [KclsuButton],
//       html: `  <div id="searchable">
//                   <kclsu-button purple small text="A random button"></kclsu-button>
//                   <p class="red">Hello</p>
//                 </div>`
//     });

//     const attrs = await fetchElementAttributes(page.root, 'kclsu-button');

//     console.log(attrs);
//     expect(attrs).toHaveLength(4)

//   })
// })

