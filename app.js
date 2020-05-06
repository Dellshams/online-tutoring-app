const mongoose = require("mongoose");
const express = require('express');
const app = express();
const authRoutes = require("./routes/auth");


app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(authRoutes);
app.use((req, res) => {
    res.send("<h1>Welcome to my app</h1>");
});




mongoose
  .connect(
    "mongodb+srv://dellshams:mongodb@cluster0-f3llz.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));