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
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: 'User',
//   },
});

const Education = model('Education', educationSchema);

module.exports = Education;
