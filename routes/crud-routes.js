const express           = require('express');
const crudRoutes        = express.Router();
const mongoose          = require('mongoose');
const bodyParser        = require('body-parser');
const el                = require('connect-ensure-login');
const Cars              = require('../models/cars-model');
const Quotes            = require('../models/quotes-model');

const multer            = require('multer');
//Solution from example W5D3L1
const uploads           = multer({ dest: __dirname + '/../public/uploads/' });


//Simplist Solution
// const uploads           = multer();

//  Renaming uploaded file solution from
// https://github.com/expressjs/multer#diskstorage

const storage           = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, '/../public/uploads');
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    // cb(null, req.file.filename);
    cb(null, file.originalname);
  }
});
// const uploads       = multer({ storage: storage });

//Trying Multiple File Uploads - http://www.codingdefined.com/2016/01/multiple-file-upload-in-nodejs.html
const upload            = multer({ storage: storage}).array('photos', 10);



//Upload files and retain the original filename (from Nizar!)
/*
const multer = require('multer');
const path = require('path');


const myStorage = multer.diskStorage({
  // 'destination' performs the role of 'dest' when using 'storage'
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/my-uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const myUploader = multer({
  storage: myStorage
  // 'dest' & 'storage' options are mutually exclusive
  // dest: path.join(__dirname, '../public/my-uploads')
});
*/





crudRoutes.get('/create', el.ensureLoggedIn(), (req, res, next) => {
  res.render('create.ejs', {});
});

// crudRoutes.post('/create', el.ensureLoggedIn(), multerThing.array('picture1'), (req, res, next) => {
crudRoutes.post('/create', el.ensureLoggedIn(), uploads.single('picture1'), (req, res, next) => {


      const filename    = req.file.filename;
      console.log('/create filename: ', filename);
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
        picture1:             `/uploads/${filename}`,
        picture1_name:        filename
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

//Multiple Upload playspace
crudRoutes.post('/create2', el.ensureLoggedIn(), uploads.array('photos', 10), (req, res, next) => {
      const filename    = req.files;
      console.log('/create filename: ', filename);

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
        picture1:             `/uploads/${filename}`,
        picture1_name:        filename
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

crudRoutes.get('/allquotes', (req, res, next) => {
  Quotes.find({}, null, { sort: {date: -1}}, (err, item) => {
    if (err) {
      next(err);
      return;
    }
    res.render('all-quotes.ejs', { items: item });
  });
});

crudRoutes.post('/allquotes', (req, res, next) => {
  console.log('req.body.author', req.body.author);
  console.log('req.body', req.body);
  const newItem         = new Quotes ({
    author:               req.body.author,
    date:                 req.body.date,
    quote:                req.body.quote
  });
  newItem.save((err) => {
    if (err) {
    next(err);
    return;
    }
    console.log('New Quote Saved.');
    res.redirect('/');
  });
});

crudRoutes.get('/quotes/:id/delete', (req, res, next) => {
  const itemId          = req.params.id;
  Quotes.findByIdAndRemove(itemId, (err, item) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/crud/allquotes');
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
  const itemUpdates     = {};
  //make
  if (req.body.make !== undefined ) {
    const itemUpdates   = {
      make:             req.body.make
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {
      console.log('/edit Make', itemUpdates);
    });
  }
  //model
  if (req.body.model !== "" ) {
    const itemUpdates   = {
      model:             req.body.model
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //year
  if (req.body.year !== "" ) {
    const itemUpdates   = {
      year:             req.body.year
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //miles
  if (req.body.miles !== "" ) {
    const itemUpdates   = {
      miles:             req.body.miles
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //price
  if (req.body.price !== "" ) {
    const itemUpdates   = {
      price:             req.body.price
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //vin
  if (req.body.vin !== "" ) {
    const itemUpdates   = {
      vin:             req.body.vin
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //stock
  if (req.body.stock !== "" ) {
    const itemUpdates   = {
      stock:             req.body.stock
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //trim
  if (req.body.trim !== "" ) {
    const itemUpdates   = {
      trim:             req.body.trim
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //transmission
  if (req.body.transmission !== "" ) {
    const itemUpdates   = {
      transmission:             req.body.transmission
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //speeds
  if (req.body.speeds !== "" ) {
    const itemUpdates   = {
      speeds:             req.body.speeds
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //engine
  if (req.body.engine !== "" ) {
    const itemUpdates   = {
      engine:             req.body.engine
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //fuel
  if (req.body.fuel !== "" ) {
    const itemUpdates   = {
      fuel:             req.body.fuel
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //ext (exterior)
  if (req.body.ext !== "" ) {
    const itemUpdates   = {
      ext:             req.body.ext
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //int (interior)
  if (req.body.int !== "" ) {
    const itemUpdates   = {
      int:             req.body.int
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //show (display in inventory)
  if (req.body.show !== "" ) {
    const itemUpdates   = {
      show:             req.body.show
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //description
  if (req.body.description !== "" ) {
    const itemUpdates   = {
      description:             req.body.description
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //equipment
  if (req.body.equipment !== "" ) {
    const itemUpdates   = {
      equipment:             req.body.equipment
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //features
  if (req.body.features !== "" ) {
    const itemUpdates   = {
      features:             req.body.features
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }
  //picture1
  if (req.body.picture1 !== "" ) {
    const itemUpdates   = {
      picture1:             req.body.picture1
    };
    Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {});
  }




  // Cars.findByIdAndUpdate(itemId, itemUpdates, (err, updates) => {
  //   res.redirect('/all');
  // });
});

module.exports          = crudRoutes;
