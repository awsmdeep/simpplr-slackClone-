const express = require('express');
const router = new express.Router();
const zod = require('zod');
const { User } = require('../db/database');

// Importing the database models

router.post('/user/register', async (req,res) => {
    const userSchema = zod.object({
        email : zod.string().email()
    });
    try{
        const result = userSchema.safeParse(req.body);
        if(result.success){
            const user = new User(req.body);
            await user.save();
            res.status(201).json({
                message : "User registered Successfully!"
            })
        }else{
            throw new Error("Given String is not an email");
        }
    }catch(e){
        res.status(404).json({
            error : e.message
        })
    }
});

router.get('/user/getinfo', async (req,res) => {
    try{
        const user = await User.find({});
        res.send(user[0]);
    }catch(e){
        res.status(404).json({
            error : "Couldn't fetch details"
        })
    }
});


module.exports = router;