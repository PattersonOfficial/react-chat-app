const router = require('express').Router();

let Fruit = require('../model/fruitsModel');

// route for getting fruit list
router.get('/', (req, res) => {
  Fruit.find()
    .then((fruits) => res.json(fruits))
    .catch((err) => res.status(400).json('Error ' + err));
});

// route for getting a specific item
router.get('/:id', (req, res) => {
  Fruit.findById(req.params.id)
    .then((fruit) => res.json(fruit))
    .catch((err) => res.status(400).json('Error ' + err));
});


// route for creating or adding a new fruit
router.post('/', (req, res) => {
  let newFruits = new Fruit({
    name: req.body.name,
    amount: req.body.amount,
    info: req.body.info,
    addedBy: req.body.addedBy,
  });

  newFruits
    .save()
    .then((fruits) => res.json('New fruit added'))
    .catch((err) => res.status(400).json('Error ' + err));
});

// Route for deleting fruit
router.delete('/:id', (req, res) => {
  Fruit.findByIdAndDelete(req.params.id)
    .then(() => res.json('Fruit deleted'))
    .catch((err) => res.status(400).json('Error ' + err));
});


// Route for updating fruit
router.put('/:id', (req, res) => {
  Fruit.findByIdAndUpdate(req.params.id, {
      $set: req.body
  })
    .then(() => res.json('Fruit data updated'))
    .catch((err) => res.status(400).json('Error ' + err));
});

module.exports = router;
