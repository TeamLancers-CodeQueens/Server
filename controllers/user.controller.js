const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env
const Course = require('../models/Course');


const registerUser = async (data) => {
    let pwdString = data.password;
    if (pwdString) {
        data.password = await bcrypt.hash(pwdString, 10) 
    }
    return await User.create(data);
};

const loginUser = async (data) => {
    let  pwdString = data.password;
    let user = await User.findOne({email: data.email});
    let loggedIn = await bcrypt.compare(pwdString, user.password)
    let token;
    
    if(loggedIn) {
        token  = await jwt.sign({email:user.email}, SECRET_KEY)
    } else {
        token = null
    }
    return token;
    
}
const enroll = async (data)=>{
    let enrollStudent =  await Course.findOneAndUpdate({"_id": data.courseId}, { $push: { studentList: data.studentId } })
     let enrollCourse =  await User.findOneAndUpdate({"_id": data.studentId}, { $push: { courseList: data.courseId } })
    if(enrollCourse && enrollStudent){
        return enrollCourse
    }
}

const getCourses= async (data) => {
    let user = await User.find({"_id": data.studentId})
    let courses = await user[0].courseList;
    if (courses)
     return courses;
    else
     return null
}

module.exports = {
    registerUser,
    loginUser,
    enroll,
    getCourses
}
