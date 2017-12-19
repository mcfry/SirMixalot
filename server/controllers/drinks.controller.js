import Drink from '../models/drink';
import DrinkMix from '../models/drink_mix';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function getDrinks(req, res) {
  Drink.find().sort('-dateAdded').exec((err, drinks) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ drinks });
  });
}

export function addDrink(req, res) {
  if (!req.body.drink.name || !req.body.drink.slot) {
    return res.status(403).end();
  }

  const newDrink = new Drink(req.body.drink);

  // Let's sanitize inputs
  newDrink.name = sanitizeHtml(newDrink.name);
  newDrink.slot = sanitizeHtml(newDrink.slot);
  newDrink.content = sanitizeHtml(newDrink.content);

  newDrink.slug = slug(newDrink.name.toLowerCase(), { lowercase: true });
  newDrink.cuid = cuid();
  newDrink.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ drink: saved });
  });
}

export function getDrink(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Drink.findOne({ cuid: newCuid }).exec((err, drink) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ drink });
  });
}

export function deleteDrink(req, res) {
  const drinkId = req.body.drinkId;
  console.log(drinkId);
  DrinkMix.find({ $or: [{drink1: drinkId}, {drink2: drinkId}, {drink3: drinkId}, {drink4: drinkId}, {drink5: drinkId}] }).exec((err, drinkMixes) => {
    if (err) {
      return res.status(500).send(err);
    }

    // if (drinkMixes !== undefined) {
    //   console.log(drinkMixes);
    // }

    for (let drinkMix of drinkMixes) {
      drinkMix.remove();
    }

    Drink.findById(drinkId).exec((err, drink) => {
      if (err) {
        return res.status(500).send(err);
      } 

      drink.remove(() => {
        res.status(200).end();
      });
    });
  });
  
}
