const mongoose = require('mongoose')
const courseSchema = new mongoose.Schema({
    courseName: String,
    courseDescription: String,
    instructorName: String,
    courseOutline:Object,
    createdAt: {
        type: Date,
        default: Date.now
    },

})

const Course = mongoose.model('Course', courseSchema, 'courses');
module.exports = Course;
