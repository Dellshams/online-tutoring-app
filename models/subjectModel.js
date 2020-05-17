const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
<<<<<<< Updated upstream
    subjectName: { type: String, required: true },
    tutors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    category: { type: String }
=======

    subjectName: { type: String, required: true },
    categoryName: { type: String, required: true },
    tutors: [{ type: Schema.Types.ObjectId, ref: "User" }]
    
>>>>>>> Stashed changes

},  {timestamps: true});

module.exports = mongoose.model("Subject", subjectSchema);