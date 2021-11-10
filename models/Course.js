const mongoose = require('mongoose')
const User = require('../models/User');

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseDescription: String,
    instructorName: String,
    instructorId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required: true,
        index: true,

    },
    courseOutline:Object,
    createdAt: {
        type: Date,
        default: Date.now
    },

})

const Course = mongoose.model('Course', courseSchema, 'courses');
module.exports = Course;
