const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

const userSchema        = new Schema ({
  username:             {type: String, default: 'Username' },
  encryptedPassword:    String,
  firstname:            String,
  lastname:             String
});

const User              = mongoose.model('User', userSchema);
module.exports          = User;
