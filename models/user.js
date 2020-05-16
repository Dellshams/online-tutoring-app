const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },

    lastName: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

    subjects: [{ type: Schema.Types.ObjectId, ref: "Subject" }],

    token: { type: String },

    lesson: [{ type: Schema.Types.ObjectId, ref: "Lesson" }],

    userCategory: { type: String, enum: ["student","tutor","admin"], default: "student" },

},  {timestamps: true});

module.exports = mongoose.model("User", userSchema);