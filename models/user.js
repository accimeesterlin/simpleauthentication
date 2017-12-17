const mongoose = require('mongoose');

// Model
const UserSchema = mongoose.Schema({
    username:{
        type:String
    },

    password:{
        type:String
    }
});

const User = mongoose.model('user', UserSchema);
module.exports = User;