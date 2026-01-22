require('dotenv').config();
const mongoose = require('mongoose');
const { Area } = require('./api/collection'); // Ensure this filename is correct

const sampleAreas = [
  { name: "College Main Gate", location: { lat: 28.6139, lng: 77.2090 }, isCollected: false },
  { name: "Library Lane", location: { lat: 28.6150, lng: 77.2100 }, isCollected: false },
  { name: "Hostel Block A", location: { lat: 28.6120, lng: 77.2080 }, isCollected: false }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    // Clear existing data first so you don't get duplicates
    await Area.deleteMany({}); 
    await Area.insertMany(sampleAreas);
    console.log("🌱 Success: Data seeded into MongoDB!");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });