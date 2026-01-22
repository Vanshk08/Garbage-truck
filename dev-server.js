require('dotenv').config();
const express = require('express');
const path = require('path');
const app = require('./api/server');

// Serve static files from root directory
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5000;

// Only listen if this file is run directly (not imported)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\nServer running at http://localhost:${PORT}`);
    console.log(`Open your browser to view the WasteTrack dashboard\n`);
  });
}

module.exports = app;
