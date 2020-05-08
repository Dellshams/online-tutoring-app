const User = require("../models/user");
const Category = require("../models/categoryModel");
const Subject = require("../models/subjectModel");
const Lesson = require("../models/lessonModel");

exports.registerSubject = async (req, res, next ) =>{
    try{
        const subjectName = req.body;
        const tutorId  = req.body;

        const subject = await Subject.findOne(subjectName);
        if (!subject){
            return res.status(404)
            .json({status: false, message: "Subject not found"})
        }

        const tutor = await User.findById(tutorId);
        if(!tutor){
            return res.status(404)
            .json({status: false, message: "tutor not found"})
        }

        await Subject.findOneAndUpdate( subjectName, { $push: { tutors : tutorId }},
            { new: true, useFindAndModify: false });

        await User.findByIdAndUpdate( tutorId, { $push: { subjects: subjectName }},
            {new: true, useFindAndModify: false });

            const newSubject = await Subject.findOne(subjectName);
            res.status(200)
            .json({status: true, message: "subjects registered", data: newSubject })
    }
    catch(err) {console.log(err)};
}
