const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },

    lastName: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    subjects: { type: Array },

    token: { type: String },

    lesson: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],

    userCategory: { type: String, enum: ["student","tutor","admin"] },

},  {timestamps: true});

module.exports = mongoose.model("User", userSchema);