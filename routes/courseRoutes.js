const router = require('express').Router()
const cors = require('cors');
const Course = require('../models/Course')

router.post('/addcourse', cors(), async(req, res) => {
    const {courseName, courseDescription,instructorName,courseOutline} = req.body
    let course =  await Course.createCourse({courseName, courseDescription,instructorName,courseOutline})
    return course ? res.json({
         message: "Course Created"
    }) :
       res.status(400).json({
           token: user,
           message: "Something went wrong"
       })
});

router.get('/courses', cors(), async(req, res) => {
   Course.find().then(result => {
    res.status(200).json({
        courses: result
    })
   }).catch(err => {
    res.status(500).json({
        error: err
    })  
   })
       
});


module.exports = router;
