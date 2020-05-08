const User = require("../models/user");
const Subject = require("../models/subjectModel");
const Category= require("../models/categoryModel");

exports.getSubjectInCategoryById = (req, res, next) =>{
    const subjectId = req.body;
    const categoryName = req.body

    Category.findOne({ name: categoryName })
    .populate({path: 'subjects', match: { _id: subjectId }})
    .then( subject => {
        if(!subject){
            return res.status(404)
            .json({ status: false, message: "subject not found"})
        }
        else{
            return res.status(200)
            .json({ status: true, message: subject.subjects})
        }
        res.status(200).send({ message:"subject found", subject: subjects })
    })
    .catch( err => console.log (err))
}

exports.getAllSubjectsInACategory = (req, res, next) => {
    const categoryName = req.body;

    Category.findOne({ name: categoryName })
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

exports.searchForTutors = (req,res, next) => {

    User.find({ role: tutor }).sort({ firstName : 1 })
    .then( found =>{
        res.status(200)
        .send({ status: true, message: found })
    })
    .catch( err => console.log (err))
}
