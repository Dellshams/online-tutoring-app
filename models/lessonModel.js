const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({

    subjects: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

module.exports = mongoose.model('Lesson', lessonSchema);