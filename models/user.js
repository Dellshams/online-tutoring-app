const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String, required: true },

    lastName: { type: String, required: true },

    email: { type: String, required: true },

    password: { type: String, required: true },

<<<<<<< Updated upstream
    token: { type: string },

    userCategory: { type: String, enum: ['student','tutor','admin'] },
=======
    subjects: { type: Array },

    token: { type: string },

    userCategory: { type: String, enum: ["student","tutor","admin"] },
>>>>>>> Stashed changes

},  {timestamps: true});

module.exports = mongoose.model("User", userSchema);