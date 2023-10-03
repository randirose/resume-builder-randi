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
    maxlength: 280,
    trim: true,
  },
});

const Job = model('Job', jobSchema);

module.exports = Job;
