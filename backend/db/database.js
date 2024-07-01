const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sidharth:sidharth@skibdi.njpgxtr.mongodb.net/?retryWrites=true&w=majority&appName=Skibdi');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        requried : true
    }
});

const User = mongoose.model('User',userSchema);
module.exports = {User};