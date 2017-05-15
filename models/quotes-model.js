const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const quotesSchema      = new Schema({
  author:               String,
  date:                 String,
  quote:                String
});

const Quotes            = mongoose.model('Quotes', quotesSchema);
module.exports          = Quotes;
