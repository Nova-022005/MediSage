const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  documentType: {
    type: String,
    enum: ['prescription', 'lab-report', 'scan', 'discharge-summary', 'other'],
    required: true,
  },
  description: {
    type: String,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  documentDate: {
    type: Date,
  },
  tags: [{
    type: String,
  }],
  metadata: {
    doctor: String,
    hospital: String,
    diagnosis: String,
    medications: [String],
  },
});

module.exports = mongoose.model('Document', documentSchema);
