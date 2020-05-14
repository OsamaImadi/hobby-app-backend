const _ = require('lodash');
const {User, validateUser} = require('../models/users');
const express = require('express');
const router = express.Router();

router.get('/',async (req,res)=>{
    const users = await User.find().sort();
    res.status(200).send(users);
});

router.get('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User with the given Id nt found.');
    
    res.status(200).send(user);
});



router.post('/', async (req,res)=>{
    const{ error } = validateUser(req.body);
    if(error){
        res.status(404).send(error.details[0].message);
        return;
    }

    let user = await User.findOne({ username: req.body.username});
    if(user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body,['username']));
    
    await user.save();
    
    res.status(201).send(user);
});


module.exports = router;