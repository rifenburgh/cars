const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const quotesSchema       = new Schema({
  quote:                String,
  author:               String,
  date:                 String
});

const Quotes            = mongoose.model('Quotes', quotesSchema);
module.exports          = Quotes;
