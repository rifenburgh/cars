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
  picture:              String,
  picture2:             String,
  picture3:             String,
  picture4:             String,
  picture5:             String,
  picture6:             String,
  picture7:             String,
  picture8:             String,
  picture9:             String,
  picture10:            String

});

const Cars              = mongoose.model('Cars', carsSchema);
module.exports          = Cars;
