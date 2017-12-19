import Drink from './models/drink';
import DrinkMix from './models/drink_mix';

export default function () {

  let drink1 = {};

  Drink.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const content1 = `Sed ut perspiciatis unde omnis iste natus error
      sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
      eaque ipsa quaeenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
      occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum`;

    const content2 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
      ut aliquip ex ea commodo aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
      qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
      ipsum quia dolor sit amet.`;

    // drink_mix: drinkMix1._id

    const drink1 = new Drink({ name: 'Admin', title: 'Hello MERN', slug: 'hello-mern', cuid: 'cikqgkv4q01ck7453ualdn3hd', content: content1 });
    const drink2 = new Drink({ name: 'Admin', title: 'Lorem Ipsum', slug: 'lorem-ipsum', cuid: 'cikqgkv4q01ck7453ualdn3hf', content: content2 });

    // console.log(drink1);

    Drink.create([drink1, drink2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });

  DrinkMix.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const drinkMix1 = new DrinkMix({ name: 'Coronarita', desc: 'A delicious drink for *cough* basic *cough* bitches.', drink1: drink1._id, slug: 'test-slug', cuid: 'cikqgkv4q01ck7453ualdn3hz', image: 'img-thing.jpg'});
    // console.log(drinkMix1);

    DrinkMix.create([drinkMix1], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}