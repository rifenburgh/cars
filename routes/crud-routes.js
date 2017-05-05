const express           = require('express');
const crudRoutes        = express.Router();
const el                = require('connect-ensure-login');
const Cars              = require('../models/cars-model');

const multer            = require('multer');
//Solution from example W5D3L1
const uploads           = multer({ dest: __dirname + '/../public/uploads/' });

//Simplist Solution
// const uploads           = multer();

//  Renaming uploaded file solution from
// https://github.com/expressjs/multer#diskstorage
/*
const storage           = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, '/../public/uploads');
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, req.file.filename);
  }
});
const uploads       = multer({ storage: storage });
*/

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

// crudRoutes.post('/create', el.ensureLoggedIn(), multerThing.array('picture1'), (req, res, next) => {
crudRoutes.post('/create', el.ensureLoggedIn(), uploads.single('picture1'), (req, res, next) => {


      const filename    = req.file.filename;
      console.log('/create picture1: ');
      // const pic         = req.body.picture1;
      // const pic1        = req.body.picture1;
      // const pic2        = req.body.picture2;
      // const pic3        = req.body.picture3;
      // const pic4        = req.body.picture4;
      // const pic5        = req.body.picture5;
      // const pic6        = req.body.picture6;
      // const pic7        = req.body.picture7;
      // const pic8        = req.body.picture8;
      // const pic9        = req.body.picture9;
      // const pic10       = req.body.picture11;

      const newItem = new Cars ({
        make:                 req.body.make,
        model:                req.body.model,
        year:                 req.body.year,
        miles:                req.body.miles,
        price:                req.body.price,
        vin:                  req.body.vin,
        stock:                req.body.stock,
        trim:                 req.body.trim,
        transmission:         req.body.transmission,
        speeds:               req.body.speeds,
        engine:               req.body.engine,
        fuel:                 req.body.fuel,
        ext:                  req.body.ext,
        int:                  req.body.int,
        show:                 req.body.show,
        description:          req.body.description,
        equipment:            req.body.equipment,
        features:             req.body.features,
        picture1:              `/uploads/${filename}`
        // picture1:              `/uploads/${pic1}`,
        // picture2:              `/uploads/${pic2}`,
        // picture3:              `/uploads/${pic3}`,
        // picture4:              `/uploads/${pic4}`,
        // picture5:              `/uploads/${pic5}`,
        // picture6:              `/uploads/${pic6}`,
        // picture7:              `/uploads/${pic7}`,
        // picture8:              `/uploads/${pic8}`,
        // picture9:              `/uploads/${pic9}`,
        // picture10:             `/uploads/${pic10}`,

        // owner:                req.user._id   // <-- we add the user ID
      });
      console.log('/create req.body.picture1', req.body.picture1);
      newItem.save((err) => {
        if (err) {
          next(err);
          console.log('/create ERROR', err);
          return;
        } else {
          req.flash('New car was successfully created.');
          res.redirect('/');
        }
      });
    });

crudRoutes.get('/edit', el.ensureLoggedIn(), (req, res, next) => {});

crudRoutes.post('/edit', el.ensureLoggedIn(), (req, res, next) => {});

crudRoutes.get('/all', (req, res, next) => {
  Cars.find({ show: true }, (err, item) => {  //this should be TRUE!!!
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
    res.render('detail.ejs', { item: items });
    console.log('/item:id ', items);
    console.log('picture2 ', items.picture2);
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

crudRoutes.get('/item/:id/edit', (req, res, next) => {
  const itemId          = req.params.id;
  Cars.findById(itemId, (err, item) => {
    if (err) {
      next(err);
      return;
    }
    res.render('edit.ejs', {

      items:            item

    });
  });
});

crudRoutes.post('/item/:id/edit', (req, res, next) => {
  const itemId          = req.params.id;
  const itemUpdates     = {
    make:               req.body.make,
    model:              req.body.model,
    year:               req.body.year,
    picture1:           req.body.picture1
  };
  Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {
    res.redirect('/all');
  });
});

module.exports          = crudRoutes;
