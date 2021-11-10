const router = require('express').Router()
const cors = require('cors');
const User = require('../controllers/user.controller')
const Course = require('../controllers/course.controller')

router.post('/signup', cors(), async(req, res) => {
    const {name,email, password,username,dob,phone,counrty,gender} = req.body
    let user = await User.registerUser({name,email, password,username,dob,phone,counrty,gender})
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
    let user =  await User.loginUser({email, password})
    return user ? res.json({
        message: "Logged in successfully"
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


module.exports = router;
