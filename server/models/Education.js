const { Schema, model } = require('mongoose');

const educationSchema = new Schema({
  school: {
    type: String,
    required: true,
    trim: true,
  },
  dateRange: {
    type: String,
    required: true,
    trim: true,
  },
  degree: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const Education = model('Education', educationSchema);

module.exports = Education;
