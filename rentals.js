const express = require('express');
const db = require('../firebase');
const router = express.Router();

// Get All Rentals
router.get('/', async (req, res) => {
  try {
    const rentalsRef = db.collection('rentals');
    const snapshot = await rentalsRef.get();
    const rentals = [];
    snapshot.forEach(doc => {
      rentals.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(rentals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rentals' });
  }
});

// Add a New Rental
router.post('/', async (req, res) => {
  try {
    const { title, price, image, location, caretakerPhone } = req.body;
    const rentalRef = db.collection('rentals').doc();
    await rentalRef.set({ title, price, image, location, caretakerPhone });
    res.status(201).json({ id: rentalRef.id, message: 'Rental added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add rental' });
  }
});

module.exports = router; 
