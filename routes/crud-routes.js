const express           = require('express');
const crudRoutes        = express.Router();
const el                = require('connect-ensure-login');
const Cars              = require('../models/cars-model');

//Image Uploads
/*
    const multer = require('multer');
    const multerThing = multer({ dest: __dirname + '/../public/uploads/' });
    crudRoutes.post('/addimage',
      el.ensureLoggedIn(),
        // <input id="picture-input" type="file" name="picture">
      multerThing.single('picture'),
      (req, res, next) => {
        const filename = req.file.filename;
        const newRoom = new Room ({
          name:  req.body.name,
          desc:  req.body.desc,
          picture: `/uploads/${filename}`,
          owner: req.user._id   // <-- we add the user ID
        });

        newCar.save((err) => {
          if (err) {
            next(err);
            return;
          } else {
            req.flash('success', 'Your room has been created.');
            res.redirect('/rooms/new');
          }
        });
      }
    );
*/

crudRoutes.get('/create', el.ensureLoggedIn(), (req, res, next) => {
  res.render('create.ejs', {});
});

crudRoutes.post('/create', el.ensureLoggedIn(), (req, res, next) => {

});

crudRoutes.get('/edit', el.ensureLoggedIn(), (req, res, next) => {});

crudRoutes.post('/edit', el.ensureLoggedIn(), (req, res, next) => {});

module.exports          = crudRoutes;
