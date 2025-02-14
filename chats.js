const express = require('express');
const db = require('../firebase');
const router = express.Router();

// Send a Message
router.post('/', async (req, res) => {
  try {
    const { rentalId, senderId, message } = req.body;
    const chatRef = db.collection('chats').doc();
    await chatRef.set({ rentalId, senderId, message, timestamp: new Date() });
    res.status(201).json({ id: chatRef.id, message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get Messages for a Rental
router.get('/:rentalId', async (req, res) => {
  try {
    const { rentalId } = req.params;
    const chatsRef = db.collection('chats').where('rentalId', '==', rentalId);
    const snapshot = await chatsRef.get();
    const chats = [];
    snapshot.forEach(doc => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router; 
