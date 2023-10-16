const { Schema, model } = require('mongoose');

const jobSchema = new Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true,
  },
  employer: {
    type: String,
    required: true,
    trim: true,
  },
  jobDescription: {
    type: String,
    required: true,
    minlength: 10,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
});

const Job = model('Job', jobSchema);

module.exports = Job;
