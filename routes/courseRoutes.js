const router = require('express').Router()
const cors = require('cors');
 const Courses = require('../models/Course')
const Course = require('../controllers/course.controller')

router.post('/addcourse', cors(), async(req, res) => {
    const {courseName,email,instructorName,instructorId,courseDescription,courseOutline,courseMaterial,coursereferences,contact} = req.body
    let course =  await Course.createCourse({courseName,email,instructorName,instructorId,courseDescription,courseOutline,courseMaterial,coursereferences,contact})
    return course ? res.json({
         message: "Course Created"
    }) :
       res.status(400).json({
           token: user,
           message: "Something went wrong"
       })
});

router.get('/courses', cors(), async(req, res) => {
   Courses.find().then(result => {
    res.status(200).json({
        courses: result
    })
   }).catch(err => {
    res.status(500).json({
        error: err
    })  
   })
       
});



router.get('/courses/:id', cors(), async(req, res) => {
    const id = req.params.id;
   Courses.find({_id:id}).then(result => {
    res.status(200).json({
        course: result
    })
   }).catch(err => {
    res.status(500).json({
        error: err
    })  
   })
       
});
router.post('/students', cors(), async(req, res) => {
    const {courseId} = req.body
    let enrolled =  await Course.getStudents({courseId})


    return enrolled ? res.json({

        message: enrolled
    }) :
       res.status(400).json({
           message: "No students yet"
       })
});


module.exports = router;
