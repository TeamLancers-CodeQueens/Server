const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email: String,
    password: {
      type: String,
      min:5,
      maxlength:255
    },
    username: String,
    dob: Date,
    phone: String,
    country: String,
    location: String,

    createdAt: {
        type: Date,
        default: Date.now
    },
    courseList:[],

})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
