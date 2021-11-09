const Course = require('../models/Course');


const createCourse = async (data) => {
    
    return await Course.create(data);
};


module.exports = {
    createCourse
}
