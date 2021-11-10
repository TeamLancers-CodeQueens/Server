const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:String,
    email: String,
    password: {
      type: String,
      min:5,
      maxlength:255
    },
    username: String,
    dob: Date,
    phone: Number,
    country: String,
    gender: Boolean,
    createdAt: {
        type: Date,
        default: Date.now
    },
    courseList:[],

})

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
