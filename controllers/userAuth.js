const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const userCategory = req.body.userCategory;

    if(!firstName || !lastName || !email || !password || !userCategory) {
        res.status(400).send({
            status: false,
            message: "All fields are required"})
    return;
    } else if(userCategory === 'admin'){
        res.status(400)
        .send({ status: false, message: "You can't sign up as an admin"})
        return;
    }
    User.findOne({ email })
    .then(user => {
        if (user) {
            return res
            .status(423)
            .send({status: false, message: "This email already exists"});
    } else{
    bcrypt
    .hash(password, 12)
    .then(password => {
        let user = new User({
            firstName,
            lastName,
            email,
            password,
            userCategory,
        });
        return user.save();
    })
    .then(() => res.status(200).send({ status: true, message: "User registered successfully" }))
    }
    })
    .catch(err => console.log(err));
}

exports.logIn = (req, res, next) =>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
    .then(user =>{
      if(!user){
        return res
        .status(404)
        .send({status: false, message: "Email address not found, please enter a valid email address"})
      }
      bcrypt.compare(password, user.password)
      .then(valid =>{
        if(!valid){
          return res
          .status(403)
          .send({status: false, message: "Incorrect Password, please review your details and try again "})
        }
        const token = jwt.sign(
          {email: user.email, _id: user._id }, "startnginternship", { expiresIn: "1hr" }
        );
        User.findByIdAndUpdate(user._id, {token})
        res.status(200).send({
          status: true,
          message: "Login successful",
          _id: user._id,
          token
        });
      });
    })
    .catch(err => console.log(err));
}