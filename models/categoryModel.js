<<<<<<< Updated upstream
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({

    name: { type: String, required: true, enum: ['primary','jss','sss'] },
    subjects: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' } ]

},  {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);
=======
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true, enum: ["primary","jss","sss"] },
    subjects: [ { type: mongoose.Schema.Types.ObjectId, ref: "Subject" } ]

},  {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);
>>>>>>> Stashed changes
