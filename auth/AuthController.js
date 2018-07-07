
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const VerifyToken = require('./VerifyToken');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../user/User');

router.post('/register', function(req, res) {
  
  // encrypt it with Bcrypt’s hashing 
  const hashedPwd = bcrypt.hashSync(req.body.password, 8);
  
  // create user: name, email, password
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPwd
  },
  function (err, user) {
    if (err) return res.status(500).send("There was a problem registering the user.")
    // create a token for user
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  }); 
});

router.get('/me', VerifyToken, function(req, res, next) {
  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    
    res.status(200).send(user);
  });
});

router.post('/login', function(req, res) {
  // find a user
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    res.status(200).send({ auth: true, token: token });
  });
});

// logout: nullify token
// Disclaimer: The logout endpoint is not needed. 
// Logging out can be solely done through the client side.
router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

module.exports = router;
