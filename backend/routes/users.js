const router = require('express').Router();
const User = require('../model/userModel');

// package for encrypting user passwords
const bcrypt = require('bcryptjs');

// route to get list of all registered users
router.get('/register', (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// route function for user registration
router.post('/register', async (req, res) => {

  // form validation for registration
  if (!req.body.name || !req.body.password) {
   res.status(400).json({msg: 'Please completely fill all fields'});
  }

  if (req.body.name.length > 50) {
    res.status(400).json({ msg: 'The name length is maximum 50 characters long' });
  }

  const user  = await User.findOne({name: req.body.name})

  if (user) {
      res.status(400).json({ msg: 'User account already exist' });
  }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      // Store hash in your password DB.
      let newUser = new User({
        name: req.body.name,
        password: hash,
      });
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => res.status(400).json('Error ' + err));
    });
  });
});

// route function for deleting user account
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User Account Deleted'))
    .catch((err) => res.status(400).json('Error ' + err));
});

router.get('/login', (req, res) => {
  res.send('GET login');
});

// route function for user authentication
router.post('/login', async (req, res) => {
  const user = await User.findOne({ name: req.body.name });

  if (!user) {
    return res.status(400).send({msg: 'User does not exist'})
  }

  // Load hash from your password DB and compare.
  bcrypt.compare(req.body.password, user.password, function (err, response) {
    if (!response) {
      return res.status(400).send({ msg: 'User does not exist' });
    } else {
      res.send('Authentication successful')
    }
  });
});

module.exports = router;
