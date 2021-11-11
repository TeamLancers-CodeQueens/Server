const Course = require('../models/Course');
const User = require('../models/User');


const createCourse = async (data) => {
    
    return await Course.create(data);
};

const getStudents= async (data) => {

    let course = await Course.find({"_id": data.courseId})

    let students = await course[0].studentList;
    var studs=[];
    for (let i = 0; i < students.length; i++) {
        let student = await User.findOne({"_id": students[i]});
         studs.push(student)
    }
     console.log(studs) 

    if (studs)
     return studs;
    else
     return null
}


module.exports = {
    createCourse,
    getStudents
}
