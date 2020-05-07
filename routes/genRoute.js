//for all access: admin, students, tutors
const router = require("express").Router();

const genAuth = require('../controllers/genAuth');


//to get a subject in a a category by ID
router.get("/api/v1/category/subject/:id", genAuth.getSubjectInCategoryById);

//to get all subjects in a category
router.get("/api/v1/category/subjects", genAuth.getAllSubjectsInACategory);

//to retrieve all categories
router.get("/api/v1/categories", genAuth.getAllCategories);

//to search for subjects in a sorted order
router.get("/api/v1/subjects/sorted", genAuth.searchForSubjects);

module.exports = router;