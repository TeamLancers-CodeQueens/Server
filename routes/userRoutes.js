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
router.post('/profile', cors(), async(req, res) => {
    const {studentId} = req.body
    let enroll =  await User.getProfile({studentId})


    return enroll ? res.json({

        message: enroll
    }) :
       res.status(400).json({
           message: "No Profile"
       })
});


module.exports = router;
