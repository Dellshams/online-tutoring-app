const mongoose = require("mongoose");
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
<<<<<<< Updated upstream
const genRoutes = require("./routes/genRoute");
const adminRoutes = require("./routes/adminRoute");
=======
<<<<<<< Updated upstream
=======
const genRoutes = require("./routes/genRoute");
<<<<<<< Updated upstream
>>>>>>> Stashed changes
>>>>>>> Stashed changes

=======
const adminRoutes = require("./routes/adminRoute");
const tutorRoutes = require("./routes/tutorRoute")
>>>>>>> Stashed changes

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(authRoutes);
<<<<<<< Updated upstream
app.use(genRoutes);
app.use(adminRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to my app");
=======
<<<<<<< Updated upstream
=======
app.use(genRoutes);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
app.use((req, res) => {
    res.send("<h1>Welcome to my app</h1>");
>>>>>>> Stashed changes
});
=======
app.use(adminRoutes);
app.use(tutorRoutes);
app.get("/", (req, res) =>
    res.send("Welcome to my app"));
>>>>>>> Stashed changes




mongoose
  .connect(
    "mongodb+srv://dellshams:mongodb@cluster0-f3llz.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log("Database connected");
    app.listen(3000);
  })
  .catch(err => console.log(err));