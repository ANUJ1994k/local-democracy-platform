const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const Alert = require('./models/Alert');
const legislationRoutes = require('./routes/legislation');
const voteRoutes = require('./routes/votes'); // ✅ Community voting routes

// EXPRESS APP
const app = express();
app.use(cors());
app.use(express.json());

// CREATE RAW HTTP SERVER
const server = http.createServer(app);

// SOCKET.IO INIT
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // ✅ frontend origin
    methods: ['GET', 'POST'],
  }
});

// ========================
// Routes
// ========================
app.use('/api/legislation', legislationRoutes); // ✅ Legislation summary
app.use('/api/votes', voteRoutes);              // ✅ Voting routes

// ========================
// Socket.io Events
// ========================
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  // Test Alert on Connect
  const fakeAlert = {
    location: "Sector 5",
    message: "🚨 Water supply disruption from 2 PM - 5 PM",
  };
  socket.emit("receive_alert", fakeAlert);

  // Admin sends alert
  socket.on('send_alert', (data) => {
    console.log('📢 Alert received:', data);
    io.emit('receive_alert', data); // broadcast to all clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// ========================
// MongoDB + Server Start
// ========================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });
