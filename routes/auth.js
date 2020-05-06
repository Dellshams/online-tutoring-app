const router = require("express").Router();

const { signUp } = require("../controllers/userAuth");


router.post('/signup', signUp);

module.exports = router;