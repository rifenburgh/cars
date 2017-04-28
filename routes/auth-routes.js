const express           = require('express');
const authRoutes        = express.Router();
const User              = require('../models/user-model');
const bcrypt            = require('bcrypt');
const passport          = require('passport');


authRoutes.get('/', (req, res, next) => {
  res.render('index.ejs', {
    session:            req.session,
    u:                  req.user
  });
  console.log('REQ.SESSION: ', req.session);
  console.log('REQ.USER: ', req.user);
});

//login get
authRoutes.get('/login', (req, res, next) => {
  res.render('login.ejs', {
    errorMessage: req.flash('error')
  });
});


//login post
authRoutes.post('/login',
  passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect:    '/login',
    failureFlash:       true,
    successFlash:       'You have been logged in, user!',
    passReqToCallback:  true
  })
);

//Logout
authRoutes.get("/logout", (req, res) => {
  req.logout();
  req.flash('success', 'You have logged out.');
  res.redirect("/");
});

//signup get
authRoutes.get("/signup", (req, res, next) => {
  res.render("signup.ejs");
});


//signup post
authRoutes.post("/signup", (req, res, next) => {
  const username        = req.body.username;
  const password        = req.body.password;
  const firstname       = req.body.firstname;
  const lastname        = req.body.lastname;
  console.log('/signup POST Username:', username, ' Password:', password);

  if (username === "" || password === "") {
    res.render("signup.ejs", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("signup", { message: "The username already exists" });
      return;
    }

    const salt          = bcrypt.genSaltSync(10);
    const hashPass      = bcrypt.hashSync(password, salt);

    const newUser       = User({
      firstname:        firstname,
      lastname:         lastname,
      username:         username,
      encryptedPassword:hashPass
    });

    newUser.save((err) => {
      if (err) {
        res.render("signup.ejs", { message: "Something went wrong" });
      } else {
        req.flash('success', 'You have been registered. Try logging in.');
        res.redirect("/");
      }
    });
  });
});



//Facebook
/*
authRoutes.get("/auth/facebook", passport.authenticate("facebook"));
authRoutes.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/",
  failureRedirect: "/login"
}));
*/

//Google
/*
authRoutes.get("/auth/google", passport.authenticate("google", {
  scope: ["https://www.googleapis.com/auth/plus.login",
          "https://www.googleapis.com/auth/plus.profile.emails.read"]
}));
authRoutes.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
}));



*/



module.exports          = authRoutes;
