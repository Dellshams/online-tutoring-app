const User = require("../models/user");
const Category= require("../models/categoryModel");
const Subject = require("../models/subjectModel");
const Lesson = require("../models/lessonModel");


exports.createCategory = (req, res, next) => {
    const categoryName = req.body;

    if(categoryName != "primary" || "jss" || "sss") {
        return res.status(404)
        .send({status: false, message: "Name of Category can only be primary, jss, sss"})
    }

    Category.findOne({ categoryName })
    .then( category => {
        if(category){
            return res.status(404)
            .send({status: false, message: "Category exists"})
        }
        else{
            let newCategory = new Category({ categoryName: categoryName })
            newCategory.save()
            return newCategory
        }
    })
    .then( newCategory => {
    res.status(200).
    send({ status: true, message: "Category created", newCategory })
    })
    .catch(err => console.log(err))
}


exports.createSubjects = (req, res, next) => {
    const subjectName = req.body;
    const categoryName = req.body;

    Subject.findOne({ subjectName })
    .then( subject => {
        if(subject){
            return res.status(404)
            .send({ status: false, message: "Subject exists" })
        }
        else{
            let newSubject = new Subject({ subjectName, Category: categoryName })
            newSubject.save();

            Category.findOneAndUpdate( categoryName, { $push: { subjects : newSubject.id}},
                { new: true, useFindAndModify: false})
            .then(newSubject => {
                return  newSubject.save()
            })
            return newSubject
        }
    })
    .then(newSubject => {
        res.status(200)
        .json({ status: true, message: "Subject created", newSubject })
    })
    .catch(err => console.log(err))
}

exports.updateSubjectInCategoryById = (req, res, next) => {
    const subjectId = req.body;
    const subjectName = req.body;

    Subject.findById(subjectId)
    .then( subject => {
        if(!subject) {
            return res.status(404)
            .send({ status: false, message: "Subject not found"})
        }
        else{
            Subject.findByIdAndUpdate(subjectId, {subjectName})

                Subject.findById(subjectId)
                .then( subject => {
                    res.status(200)
                    .send({ status: true, message: "Subject status has been updated", data: subject })
                })
            }
    })
    .catch( err => console.log(err))
}

exports.deleteSubjectInCategoryById = (req, res, next) => {

    const subjectId = req.body;
    const categoryName = req.body;

    Subject.findById(subjectId)
    .then( subject => {
        if(!subject){
            return res.status(404)
            .send({ status: false, message: "subject not found"})
        }
        else{
            Subject.findByIdAndDelete(subjectId)
            .then( subject => {

                Category.update( categoryName, { $pull: { subjects : subjectId}})
                return res.status
                .json({ status:true, message:  "Subject deleted"})
            })
        }
    })
    .catch(err => console.log(err))
}

exports.deleteCategory = (req, res, next) => {
    const categoryId = req.body

    Category.findById(categoryId)
    .then( category => {
        if(!category){
            return res.status(404)
            .send({ status: false, message: "Category not found"})
        }
        else{
            Category.findByIdAndDelete(categoryId)
            .then( category => {
                res.status(200)
                .send({ status: true, message: "Category deleted", data: category})
            })
        }
    })
    .catch(err => console.log(err))
}

// exports.updateCategory = (req, res, next) => {
//     const categoryId = req.body;
//     const categoryName = req.body;

//     Category.findById(categoryId)
//     .then( category => {
//         if(!category){
//             return res.status(404)
//             .send({ status: false, message: "Category not found"})
//         }
//         else{
//             Category.update(categoryName)
//             .then( category => {
//                 return res.status(200)
//                 .send({ status: true, message: "Category name updated"})
//             })
//         }
//     })
//     .catch(err => console.log(err))
// }

exports.getAllTutors = (req, res, next) => {

    User.find({ userCategory: "tutor"})
    .then( tutors => {
        return res.status(200)
        .send({ status: true, data: tutors})
    })
    .catch(err => console.log(err))
}

exports.getTutorById = (req, res, next) => {
    const tutorId = req.body;

    User.findById(tutorId)
    .then( tutor => {
        if(!tutor){
            return res.status(404)
            .send({ status: false, message: " Tutor not found "})
        }
        else{
            return res.status(200)
            .json({ status: true, data: tutor})
        }
    })
    .catch(err => console.log(err))
}

exports.deleteTutorById = (req, res, next) => {
    const tutorId = req.body;

    User.findById(tutorId)
    .then( tutor => {
        if(!tutor){
            return res.status(404)
            .send({ status: false, message: " Tutor not found "})
        }
        else{
            User.findByIdAndDelete(tutorId)
            .then( tutor => {
                return res.status(200)
                .send({ status: true, message: "Tutor deactivated"})
            })
        }
    })
    .catch(err => console.log(err))
}

exports.bookALesson = async (req, res, next) => {
    try{
    const tutorName = req.body;
    const subjectName = req.body;
    const studentName = req.body;
    const categoryId = req.body;

    const tutor = await User.findOne ({firstName: tutorName})
        if(!tutor){
            return res.status(404)
            .send({ status: false, message: "Tutor not found"})
        }

    const subject = await Subject.findOne ({subjectName})
        if(!subject){
            return res.status(404)
            .send({ status: false, message: "subject not found"})
        }

    const students = await User.findOne ({firstName: studentName})
        if(!students){
            return res.status(404)
            .send({ status: false, message: "Student not found"})
        }

    const category = await Category.findById (categoryId)
        if(!category){
            return res.status(404)
            .send({ status: false, message: "Category not found"})
        }

    const category = await Lesson.findById(lessonId)
        if(Lesson){
            return res.status(200)
            .send({ status: true, message: "Lesson exists"})
        }

    let newLesson = await new Lesson({
    tutorName: tutorName,
    subjectName,
    studentName: studentName,
    category: categoryId,
    })
    await newLesson.save();

    const newLessonTutor = await User.findOneAndUpdate( {firstname: tutorName}, { $push: { lesson: newLesson._id }},
        { new: true, useFindAndModify: false });
        await newLessonTutor.save();

    const newLessonStudent = await User.findOneAndUpdate( {firstname: studentName}, { $push: { lesson: newLesson._id }},
        { new: true, useFindAndModify: false });
        await newLessonStudent.save();

    res.status(200)
    .json({ status: true, message: "New Lesson registered", data: newLesson })
}
catch(error){
    next(error)
}
}

exports.getLessons = (req, res, next) => {

    Lesson.find({})
    .then( lessons =>{
        return res.status(200)
        .send({ status: true, message: lessons })
    })
    .catch(err => console.log(err))
}

exports.getALessonById = (req, res, next) => {
    const lessonId = req.body;

    Lesson.findById(lessonId)
    .then( lesson => {
        if(!lesson){
            return res.status(404)
            .send({ status: false, message: "Lesson not found"})
        }
        else{
               return res.status(200)
                .json({ status: true, data: lesson})
        }
    })
    .catch(err => console.log(err))
}

exports.updateALessonById = async(req, res, next ) => {
    try {
        const tutorName = req.body;
        const subjectName = req.body;
        const studentName = req.body;
        const categoryId = req.body;

        const lessons = await Lesson.findById(lessonId)
            if(!lessons){
                return res.status(404)
                .send({status: false, message: "lesson not found"})
            }

        const updatedLesson = await Lesson.findByIdAndUpdate(lessonId, {
            studentName: studentName,
            tutorName: tutorName,
            subjectName,
            category: categoryId,
        })
        await updatedLesson.save();

        const lesson = await Lesson.findById(lessonId)
        res.status(200)
        .json({ status: true, message: "Lesson status has been updated", data: lesson })

    }catch(err){console.log(err)}
}

exports.deleteALessonById = (req, res, next) => {
    const lessonId = req.body;

    Lesson.findById(lessonId)
    .then( lessons =>{
        if(!lessons){
            return res.status(404)
            .send({status: false, message: "lesson not found"})
        }
        else{
            Lesson.findByIdAndDelete(lessonId)
            .then( lessons => {
                res.status(200)
                .json({ status: true, message: "Lesson deleted"})
            })
        }
    })
    .catch(err => console.log(err))
}

exports.makeATutorAdmin = (req, res, next) =>{
    const tutorId = req.body;

    User.findById(tutorId)
    .then(result =>{
        if(!result) {
        return res
        .status(404).json({ status: false, message: "Cannot find Tutor"})
        }
        else{

            User.findByIdAndUpdate(tutorId, {userCategory: 'admin' })
            .then( tutor =>{
            tutor.save()
            return res.status(200)
            .json({ status: true, message: "Upgraded tutor to admin role!"})
        })
        }
    })
    .catch(err => console.log(err));
  }
