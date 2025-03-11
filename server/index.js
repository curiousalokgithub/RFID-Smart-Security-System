import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

app.use(cors());
app.use(express.json());

// Middleware to handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/access', async (req, res) => {
  try {
    const { cardId, location } = req.body;
    
    // Check if card is authorized
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('card_id', cardId)
      .single();

    if (userError) throw userError;

    const accessGranted = userData && userData.is_active;
    const accessLog = {
      user_id: userData?.id,
      card_id: cardId,
      location,
      access_granted: accessGranted,
      timestamp: new Date()
    };

    // Log the access attempt
    const { error: logError } = await supabase
      .from('access_logs')
      .insert([accessLog]);

    if (logError) throw logError;

    // Emit real-time event
    io.emit('access-event', {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: accessLog.timestamp,
      cardId: accessLog.card_id,
      userName: userData?.name || 'Unknown',
      accessType: accessGranted ? 'granted' : 'denied',
      location: accessLog.location
    });

    res.json({ success: true, accessGranted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// WebSocket handling
io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});