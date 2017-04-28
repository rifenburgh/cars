const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;
const carsSchema        = new Schema({
  make:                 String,
  model:                String,
  year:                 String,
  miles:                Number,
  price:                Number,
  vin:                  String,
  stock:                String,
  trim:                 String,
  transmission:         String,
  speeds:               String,
  engine:               String,
  fuel:                 {type: String, default: 'Gasoline' },
  ext:                  String,
  int:                  String,
  show:                 { type: Boolean, default: true },
  description:          String,
  equipment:            String,
  features:             String,



});

const Cars              = mongoose.model('Cars', carsSchema);
module.exports           = Cars;
