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
    return {token, user};
    
}
const enroll = async (data)=>{
    let enrollStudent =  await Course.findOneAndUpdate({"_id": data.courseId}, { $push: { studentList: data.studentId } })
     let enrollCourse =  await User.findOneAndUpdate({"_id": data.studentId}, { $push: { courseList: data.courseId } })
    if(enrollCourse && enrollStudent){
        return enrollCourse
    }
}

const getCourses= async (data) => {
    let user = await User.find({"_id": data.userId})
    let courses = await user[0].courseList;
    if (courses)
     return courses;
    else
     return null
}





const editProfile= async (data) => {
    let user = await User.find({"_id": data.userId})

    // let user = await User.findById(data.userId, function (err) {
        if (!user) {
            req.flash('error', 'No account found');
            return res.redirect('/login');
        }

        // good idea to trim 
        var username = data.userName.trim();
        var phone = data.phone.trim();
        var country = data.country.trim();
        var location = data.location.trim();

        // validate 
        if (!username || !phone || !country || !location) { // simplified: '' is a falsey
            req.flash('error', 'One or more fields are empty');
            return res.redirect('/edit'); // modified
        }
        user.userName = username;
        user.phone = phone; // why do you have two? oh well
        user.country = country;
        user.location = location;

        // don't forget to save!
        user.save(function (err) {

            // todo: don't forget to handle err

            res.redirect('/profile/');
        });
  //  });
return user;
    
}

module.exports = {
    registerUser,
    loginUser,
    enroll,
    getCourses,
    editProfile
}
