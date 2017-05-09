const express           = require('express');
const apiRoutes         = express.Router();
const el                = require('connect-ensure-login');
const Cars              = require('../models/cars-model');

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

//Show details of specific item
apiRoutes.get('/detail/:id', (req, res, next) => {
  Cars.find((err, items) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(items);
  });
});


module.exports          = apiRoutes;
