const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({


}, {timestamps: true});

module.exports = mongoose.model("Subject", subjectSchema);