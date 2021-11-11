const mongoose = require('mongoose')
const User = require('../models/User');

const courseSchema = new mongoose.Schema({
    courseName: String,
    email: String,
    instructorName: String,
    instructorId:{
        type:mongoose.Schema.ObjectId,
        ref:User,
        required: true,
        index: true,

    },
    courseDescription: String,
   courseMaterial: String,
    courseOutline:Object,
    coursereferences:String,
    contact:String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    studentList: [],

})

const Course = mongoose.model('Course', courseSchema, 'courses');
module.exports = Course;
