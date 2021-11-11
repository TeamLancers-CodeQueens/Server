const router = require('express').Router()
const cors = require('cors');
const User = require('../controllers/user.controller')
const Course = require('../controllers/course.controller')

router.post('/signup', cors(), async(req, res) => {
    const {firstName,lastName,email, password,username,dob,phone,country,location} = req.body
    let user = await User.registerUser({firstName,lastName,email, password,username,dob,phone,country,location})
    return user ? 
       res.status(201).json({
           email: user.email,
           createdAt: user.createdAt
        }) : 
       res.status(400).json({
           message: "Error signing up"
       });
})

router.post('/login', cors(), async(req, res) => {
    const {email, password} = req.body
    let result =  await User.loginUser({email, password})
    return result ? res.json({
        message: "Logged in successfully",
        token: result.token,
        user:result.user
    }) :
       res.status(400).json({
           message: "Invalid username/password"
       })
});
router.post('/mycourses', cors(), async(req, res) => {
    const {studentId} = req.body
    let enroll =  await User.getCourses({studentId})


    return enroll ? res.json({

        message: enroll
    }) :
       res.status(400).json({
           message: "You dont have any courses yet"
       })
});
router.post('/editProfile', cors(), async(req, res) => {
    const {userId,userName,phone,country,location} = req.body
    let edit =  await User.editProfile({userId,userName,phone,country,location})


    return enroll ? res.json({

        message: enroll
    }) :
       res.status(400).json({
           message: "No Profile"
       })
});
router.post('/enroll', cors(), async(req, res) => {
    const {courseId,userId} = req.body
    let edit =  await User.enroll({courseId,userId})


    return enroll ? res.json({

        message: enroll
    }) :
       res.status(400).json({
           message: "No Profile"
       })
});


module.exports = router;
