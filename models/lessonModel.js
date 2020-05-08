const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    tutorName: { type: String, required: true},
    subjectsName: { type: String, required: true },
    studentName: { type: String, required: true},
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }

},  {timestamps: true});

module.exports = mongoose.model("Lesson", lessonSchema);

