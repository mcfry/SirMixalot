import mongoose from 'mongoose';
import Drink from './drink';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const drinkMixSchema = new Schema({
  name: { type: 'String', required: true },
  desc: { type: 'String', required: false },
  drink1: { type: ObjectId, ref: 'Drink', required: false },
  amount1: { type: 'Number', required: false },
  drink2: { type: ObjectId, ref: 'Drink', required: false },
  amount2: { type: 'Number', required: false },
  drink3: { type: ObjectId, ref: 'Drink', required: false },
  amount3: { type: 'Number', required: false },
  drink4: { type: ObjectId, ref: 'Drink', required: false },
  amount4: { type: 'Number', required: false },
  drink5: { type: ObjectId, ref: 'Drink', required: false },
  amount5: { type: 'Number', required: false },
  image: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('DrinkMix', drinkMixSchema);
