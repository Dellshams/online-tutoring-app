const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
<<<<<<< Updated upstream

    name: { type: String, required: true },
    tutors: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
=======
    name: { type: String, required: true },
    tutors: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: { type: String, required: true }
>>>>>>> Stashed changes

},  {timestamps: true});

module.exports = mongoose.model("Subject", subjectSchema);