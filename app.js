const mongoose = require("mongoose");
const express = require('express');
const app = express();
const authRoutes = require("./routes/auth");
const genRoutes = require("./routes/genRoute");
const adminRoutes = require("./routes/adminRoute");
const tutorRoutes = require("./routes/tutorRoute")


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(authRoutes);
app.use(genRoutes);
app.use(adminRoutes);
app.use(tutorRoutes);
app.get("/", (req, res) =>
    res.send("Welcome to my app"));





mongoose
  .connect(
    "mongodb+srv://dellshams:mongodb@cluster0-f3llz.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));