const User = require("../models/user");
const Category= require("../models/categoryModel");
const Subject = require("../models/subjectModel");


exports.getSubjectInCategoryById = (req, res, next) =>{
    const subjectId = req.body;

    Subject.findById(subjectId)
    .then( subject => {
        if(!subject){
            return res.status(404)
            .send({ status: false, message: "subject not found"})
        }
        else{
            Subject.findById(subjectId)
            .then( subject => {
                return res.status(200)
                .send({ status: true, message: subject})
            })
        }
    })
    .catch( err => console.log (err))
}

exports.getAllSubjectsInACategory = (req, res, next) => {
    const categoryName = req.body;

    Category.findOne(categoryName)
    .populate("subjects")
    .then( subjects => {
        res.status(200)
        .send({ message: subjects})
    })
    .catch( err => console.log (err))
}

exports.getAllCategories = (req, res, next) => {

    Category.find({})
    .then( categories => {
        res.status(200)
        .send({ status: true, message: categories })
    })
    .catch( err => console.log (err))
}

  exports.searchForSubjects = (req,res, next) => {

    Subject.find().sort({ name : 1 })
    .then( found =>{
        res.status(200)
        .send({ status: true, message: found })
    })
    .catch( err => console.log (err))
}

// exports.searchForTutors = (req,res, next) => {

//     ------.find().sort({ firstName : 1 })
//     .then( found =>{
//         res.status(200)
//         .send({ status: true, message: found })
//     })
//     .catch( err => console.log (err))
// }
