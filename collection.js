const mongoose = require('mongoose');

const AreaSchema = new mongoose.Schema({
  name: String,
  location: { lat: Number, lng: Number },
  isCollected: { type: Boolean, default: false },
  lastCollectedAt: Date
});

const ComplaintSchema = new mongoose.Schema({
  areaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
  description: String,
  status: { type: String, default: 'Pending' }
});

// Exporting both models
const Area = mongoose.model('Area', AreaSchema);
const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = { Area, Complaint };