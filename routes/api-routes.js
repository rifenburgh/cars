const express           = require('express');
const apiRoutes         = express.Router();
const el                = require('connect-ensure-login');
const Cars              = require('../models/cars-model');
const Quotes            = require('../models/quotes-model');

//Search the database for all of the items that a 'true' attribute for Show and return them to the Anuglar applciation
apiRoutes.get('/all', (req, res, next) => {
  Cars.find({ 'show': true }, (err, items) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(items);
  });
});

//Pull the first three items from the show database
apiRoutes.get('/three', (req, res, next) => {
  const theThree            = [];
  Cars.find({ 'show': true }, (err, items) => {
    if (err) {
      res.json(err);
      return;
    }
    for (var i = 0; i < 3; i++) {
      theThree.push(items[i]);
    }
    res.json(theThree);
  });
});

//Show details of specific item
apiRoutes.get('/detail/:id', (req, res, next) => {

  Cars.findById(req.params.id, (err, items) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(items);
  });

});


module.exports          = apiRoutes;
