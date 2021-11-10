const Course = require('../models/Course');


const createCourse = async (data) => {
    
    return await Course.create(data);
};

const getStudents= async (data) => {
    let course = await Course.find({"_id": data.courseId})
    let students = await course[0].studentList;
    if (students)
     return students;
    else
     return null
}


module.exports = {
    createCourse,
    getStudents
}
