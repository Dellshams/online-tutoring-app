//for all access: admin, students, tutors
const router = require("express").Router();
const genAuth = require("../controllers/genAuth");
const userAuth = require("../controllers/userAuth");


//to get a subject in a a category by ID
router.get("/api/v1/category/subject/:id",userAuth.grantUserAccess, genAuth.getSubjectInCategoryById);

//to get all subjects in a category
router.get("/api/v1/category/subjects",userAuth.grantUserAccess, genAuth.getAllSubjectsInACategory);

//to retrieve all categories
router.get("/api/v1/categories",userAuth.grantUserAccess, genAuth.getAllCategories);

//to search for subjects in a sorted order
router.get("/api/v1/subjects/sorted",userAuth.grantUserAccess, genAuth.searchForSubjects);

//to search for tutors in a a sorted order
router.get("/api/v1/tutors/sorted",userAuth.grantUserAccess, genAuth.searchForTutors);

module.exports = router;