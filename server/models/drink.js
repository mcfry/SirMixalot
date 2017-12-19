import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const drinkSchema = new Schema({
  name: { type: 'String', required: true },
  slot: { type: 'Number', required: false },
  content: { type: 'String', required: false },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Drink', drinkSchema);
