const router = require("express").Router();

const { signUp, logIn } = require("../controllers/userAuth");


router.post("/api/v1/signup", signUp);
router.post("/api/v1/login", logIn);

module.exports = router