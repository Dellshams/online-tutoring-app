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
    .then(() => res.status(200).
    send({ status: true, message: "Category created" })
    )
    .catch(err => console.log(err))
}


exports.createSubjects = (req, res, next) => {
    const subjectName = req.body;
    const categoryName = req.body;

    Subject.findOne({ subjectName })
    .then( subject => {
        if(subject){
            return res.status(423)
            .send({ status: false, message: "Subject exists" })
        }
        else{
            let newSubject = new Subject({ subjectName, Category: categoryName })
            newSubject.save();

            Category.findOneAndUpdate( categoryName, { $push: {subject: newSubject.id}},
                { new: true})
            .then(newSubject => {
                return  newSubject.save()
            })
            return newSubject
        }
    })
    .then(() => res.status(200).send({ status: true, message: "Subject created" })
    )
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
            .then( () =>

                Subject.update(subjectId)
                .then( ()=>
                    res.status(200)
                    .send({ status: true, message: "Subject status has been updated" })
                )
            )
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
            .then( () =>

                Category.update( categoryName, { $pull: { subject: subjectId}})
                 .then( () =>
                res.status(200)
                .send({ status:true, message:  "Subject deleted"})
                )
            )
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
                return res.status(200)
                .send({ status: true, message: "Category deleted"})
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

    User.find({ role: "tutor"})
    .then( tutors => {
        return res.status(200)
        .send({ status: true, message: tutors})
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
            User.findById(tutorId)
            .then( tutor => {
                return res.status(200)
                .send({ status: true, message: tutor})
            })
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
                if(tutor){
                    return res.status(200)
                    .send({ status: true, message: "Tutor deleted"})
                }
            })
        }
    })
    .catch(err => console.log(err))
}

exports.bookALesson = async (req, res, next) => {
    const tutorName = req.body;
    const subjectName = req.body;
    const studentName = req.body;
    const categoryName = req.body;

    await User.findOne ({tutorName})
    .then( tutor => {
        if(!tutor){
            return res.status(404)
            .send({ status: false, message: "Tutor not found"})
        }
    })

    await Subject.findOne ({subjectName})
    .then( subject => {
        if(!subject){
            return res.status(404)
            .send({ status: false, message: "subject not found"})
        }
    })

    await User.findOne ({studentName})
    .then( student => {
        if(!student){
            return res.status(404)
            .send({ status: false, message: "Student not found"})
        }
    })

    await Category.findOne ({categoryName})
    .then( category => {
        if(!category){
            return res.status(404)
            .send({ status: false, message: "Category not found"})
        }
    })

    let newLesson = await new Lesson({
        tutorName,
        subjectName,
        studentName,
        categoryId,
    })

    await newLesson.save();
    return res.status(200)
    .send({ status: true, message: "New Lesson registered" })
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
            Lesson.findById(lessonId)
            .then( lesson => {
                if(lesson){
                    return res.status(200)
                    .send({ status: true, message: lesson})
                }
            })
        }
    })
    .catch(err => console.log(err))
}

exports.updateALessonById = (req, res, next ) => {
    const tutorName = req.body;
    const subjectName = req.body;
    const studentName = req.body;
    const categoryName = req.body;

    Lesson.findById(lessonId)
    .then( lessons =>{
        if(!lessons){
            return res.status(404)
            .send({status: false, message: "lesson not found"})
        }
        else{
            Lesson.findByIdAndUpdate(lessonId, {
                studentName: student,
                tutorName: tutor,
                subjectName: subject,
                category: categoryId,
            })
            .then( () =>

                Lesson.update(lessonId)
                .then( subject => {
                    return res.status(200)
                    .send({ status: true, message: "Lesson status has been updated", subject })
                })
            )
        }
    })
    .catch(err => console.log(err))
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
            .then(lesson => {
                return res.status(200)
                .send({ status: true, message: "Lesson deleted"})
            })
        }
    })
    .catch(err => console.log(err))
}
