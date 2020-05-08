//for admin access only
const router = require("express").Router();
const adminAuth = require("../controllers/adminAuth");
const userAuth = require("../controllers/userAuth")

//to create a category
router.post("/api/v1/category",userAuth.grantAdminAccess, adminAuth.createCategory)

//to create a subject
router.post("/api/v1/subject",userAuth.grantAdminAccess, adminAuth.createSubjects)

//to update a subject in a category by ID
router.patch("/api/v1/subject",userAuth.grantAdminAccess, adminAuth.updateSubjectInCategoryById)

//to delete a subject in a category by ID
router.delete("/api/v1/subject",userAuth.grantAdminAccess, adminAuth.deleteSubjectInCategoryById)

//to delete or update a category
router.delete("/api/v1/category",userAuth.grantAdminAccess, adminAuth.deleteCategory)

//to retrieve all tutors
router.get("/api/v1/tutors",userAuth.grantAdminAccess, adminAuth.getAllTutors)

//to get a tutor by ID
router.get("/api/v1/tutor/:id",userAuth.grantAdminAccess, adminAuth.getTutorById)

//to deactivate a tutor by ID
router.delete("/api/v1/tutor/:id",userAuth.grantAdminAccess, adminAuth.deleteTutorById)

//to book a lesson
router.post("/api/v1/lesson",userAuth.grantAdminAccess, adminAuth.bookALesson)

//to retrieve all lessons
router.get("/api/v1/lessons",userAuth.grantAdminAccess, adminAuth.getLessons)

//to get a lesson by ID
router.get("/api/v1/lesson/:id",userAuth.grantAdminAccess, adminAuth.getALessonById)

//to update a lesson by ID
router.patch("/api/v1/lesson/:id",userAuth.grantAdminAccess, adminAuth.updateALessonById)

//to delete a lesson by ID
router.delete("/api/v1/lesson/:id",userAuth.grantAdminAccess, adminAuth.getALessonById)

module.exports = router;