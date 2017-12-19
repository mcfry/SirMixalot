import DrinkMix from '../models/drink_mix';
import Drink from '../models/drink';
import cuid from 'cuid';
import slug from 'slug';
import sanitizeHtml from 'sanitize-html';

export function addDrinkMix(req, res) {
  // Required
  if (!req.body.drinkMix.name || !req.body.drinkMix.drink1) {
    return res.status(403).end();
  }

  const newDrinkMix = new DrinkMix(req.body.drinkMix);

  // Sanitize inputs
  newDrinkMix.name = sanitizeHtml(newDrinkMix.name);
  newDrinkMix.desc = sanitizeHtml(newDrinkMix.desc);

  newDrinkMix.slug = slug(newDrinkMix.name.toLowerCase(), { lowercase: true });
  newDrinkMix.cuid = cuid();
  newDrinkMix.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ drinkMix: saved });
  });
}

export function getDrinkMixes(req, res) {
  DrinkMix.find().sort('-dateAdded').exec((err, drinkMixes) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ drinkMixes });
  });
}

export function getDrinkMix(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  
  let conditions = [];

  // Sloppy
  DrinkMix.findOne({ cuid: newCuid }).exec((err, drinkMix) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (drinkMix.drink1) {
      conditions.push('drink1');
    }
    if (drinkMix.drink2) {
      conditions.push('drink2');
    }
    if (drinkMix.drink3) {
      conditions.push('drink3');
    }
    if (drinkMix.drink4) {
      conditions.push('drink4');
    }
    if (drinkMix.drink5) {
      conditions.push('drink5');
    }

    DrinkMix.findOne({ cuid: newCuid }).populate(conditions).exec((err, drinkMix) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ drinkMix });
    });

  });
}

export function deleteDrinkMix(req, res) {
  const drinkMixId = req.body.drinkMixId;
  DrinkMix.findById(drinkMixId).exec((err, drinkMix) => {
    if (err) {
      return res.status(500).send(err);
    }

    drinkMix.remove(() => {
      res.status(200).end();
    });
  });
}