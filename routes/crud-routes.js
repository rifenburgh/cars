const express           = require('express');
const crudRoutes        = express.Router();
const el                = require('connect-ensure-login');
const Cars              = require('../models/cars-model');
const multer            = require('multer');
const multerThing       = multer({ dest: __dirname + '/../public/uploads/' });

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

crudRoutes.post('/create', el.ensureLoggedIn(), multerThing.single('picture'), (req, res, next) => {
  /*
  //Multer NPM package is used to upload pictures
  const multer = require('multer');
  const multerThing = multer({ dest: __dirname + '/../public/uploads/' });
  */
      const filename = req.file.filename;
      const newItem = new Cars ({
        name:  req.body.name,
        desc:  req.body.desc,
        picture: `/uploads/${filename}`,
        owner: req.user._id   // <-- we add the user ID
      });

      newItem.save((err) => {
        if (err) {
          next(err);
          return;
        } else {
          req.flash('success', 'Your room has been created.');
          res.redirect('/');
        }
      });
    });

crudRoutes.get('/edit', el.ensureLoggedIn(), (req, res, next) => {});

crudRoutes.post('/edit', el.ensureLoggedIn(), (req, res, next) => {});

crudRoutes.get('/all', (req, res, next) => {
  Cars.find({ show: true }, (err, item) => {
    if (err) {
      next(err);
      return;
    }
    res.render('all.ejs', { items: item });
  });
});

crudRoutes.get('/item/:id', (req, res, next) => {
  const itemId        = req.params.id;
  Cars.findById(itemId, (err, items) => {
    if (err) {
      next(err);
      return;
    }
    res.render('/show', { item: items });
  });
});

crudRoutes.get('/item/:id/delete', (req, res, next) => {
  const itemId        = req.params.id;
  Cars.findByIdAndRemove(itemId, (err, item) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/crud/all');
  });
});


module.exports          = crudRoutes;
