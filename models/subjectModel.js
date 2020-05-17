const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({

    subjectName: { type: String, required: true },
    categoryName: { type: String, required: true },
    tutors: [{ type: Schema.Types.ObjectId, ref: "User" }]

},  {timestamps: true});

module.exports = mongoose.model("Subject", subjectSchema);