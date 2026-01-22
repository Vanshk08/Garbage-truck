const express = require('express');
const router = express.Router();
const { Area, Complaint } = require('./collection'); // Import models

// 1. NEW ROUTE: Get all areas (This is what the map needs!)
router.get('/areas-status', async (req, res) => {
  try {
    const areas = await Area.find();
    res.json(areas);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch areas" });
  }
});

// 2. Route: Driver marks area as collected
router.patch('/collect/:areaId', async (req, res) => {
  try {
    const area = await Area.findByIdAndUpdate(req.params.areaId, {
      isCollected: true,
      lastCollectedAt: new Date()
    }, { new: true });
    res.json(area);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

// 3. Route: User files a complaint
router.post('/complaint', async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.json({ message: "Complaint logged!" });
  } catch (err) {
    res.status(500).json({ error: "Complaint failed" });
  }
});
// Add this to your brain.js file
router.get('/view-complaints', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch complaints" });
    }
});

// Route: Delete/Withdraw a complaint
router.delete('/withdraw-complaint/:id', async (req, res) => {
    try {
        await Complaint.findByIdAndDelete(req.params.id);
        res.json({ message: "Complaint resolved and removed!" });
    } catch (err) {
        res.status(500).json({ error: "Failed to remove complaint" });
    }
});
module.exports = router;