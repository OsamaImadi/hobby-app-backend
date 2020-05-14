const { Hobby, validate } = require("../models/hobbies");
const {User} = require('../models/users');
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const hobbies = await Hobby.find();
  res.send(hobbies);
});

router.get("/user/:id", async (req, res)=>{

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send('User with the given Id nt found.');
  
  const userHobbies = await Hobby.find({'user._id':user._id });
  if (!userHobbies) return res.status(404).send('No hobby by this user');

  
  res.status(200).send(userHobbies);
  
})

//Adding/posting new hobby
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  let hobby = new Hobby({ 
    hobby: req.body.hobby,
    user: {
      _id: user._id,
      username: user.username
    },
    passion: req.body.passion,
    year: req.body.year
  });

  await hobby.save();
  res.status(201).send(hobby);
});


router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  const hobby = await Hobby.findByIdAndUpdate(req.params.id,
    { 
      hobby: req.body.hobby,
      user: {
        _id: user._id,
        username: user.username
      },
      passion: req.body.passion,
      year: req.body.year
    }, { new: true });

  if (!hobby) return res.status(404).send('The hobby with the given ID was not found.');
  
  res.send(hobby);
});

router.delete('/:id', async (req, res) => {
  const hobby = await Hobby.findByIdAndRemove(req.params.id);

  if (!hobby) return res.status(404).send('The hobby with the given ID was not found.');

  res.send(hobby);
});


module.exports = router;
