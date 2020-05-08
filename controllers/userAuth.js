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
        return res.status(400)
        .send({ status: false, message: "All fields are required"})

    } else if(userCategory == "admin"){
        return res.status(400)
        .send({ status: false, message: "You can't sign up as an admin"})
    }
    User.findOne({ email })
    .then(user => {
        if (user) {
            return res.status(423)
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
      user.save();
      return user;
    })
    .then(() => res.status(200)
    .send({ status: true, message: "User registered successfully" }))
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
          { email: user.email, _id: user._id }, "startnginternship", { expiresIn: "1hr" }
        );
        User.findByIdAndUpdate(user._id, {token: token})
        res.status(200).send({
          status: true, message: "Login successful", _id: user._id, token });
        console.log(user.token)
      });
    })
    .catch(err => console.log(err));
}

exports.grantAdminAccess =  async (req, res, next) => {
try{
  const token = req.body.token;
  if(!token) {
    return res.status(404)
    .send({ status: false, message: "Pleas input a valid token"})
  }

   user = await User.findOne({token})
      const userCategory = user.userCategory
      if(userCategory != "admin") {
        return res.status(401)
        .send({ status: false, message: "You are not authorized to access this resource"})
      }
      next();
  }
  catch(error){
  next(error)
  }
}

exports.grantTutorAccess =  async (req, res, next) => {
  try{
    const token = req.body.token;
    if(!token) {
      return res.status(404)
      .send({ status: false, message: "Pleas input a valid token"})
    }

     user = await User.findOne({token})
        const userCategory = user.userCategory
        if(userCategory != "tutor") {
          return res.status(401)
          .send({ status: false, message: "You are not authorized to access this resource"})
        }
        next();
    }
    catch(error){
    next(error)
    }
  }

exports.grantUserAccess =  async (req, res, next) => {
  try{
    const token = req.body.token;
    if(!token) {
      return res.status(404)
      .send({ status: false, message: "Pleas input a valid token"})
    }

    user = await User.findOne({token})
        const userCategory = user.userCategory
        if(!userCategory) {
          return res.status(401)
          .send({ status: false, message: "You are not authorized to access this resource"})
        }
        next();
  }
  catch(error){
  next(error)
    }
  }

