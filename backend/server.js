import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors({
  origin: ['http://40.82.193.134'], // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the HTTP methods you allow
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

app.use('/api/', limiter);

const connection = new sqlite3.Database('./db/aplikasi.db')

app.get('/api/user/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  const userId = req.params.id;

  connection.all(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).send('Internal Server Error');
    }
    res.json(results);
  });
});

app.post('/api/user/:id/change-email', (req, res) => {
  const newEmail = req.body.email;
  const userId = req.params.id;
  const query = `UPDATE users SET email = ? WHERE id = ?`;

  connection.run(query, [newEmail, userId], function (err) {
    if (err) {
      console.error('Error updating email:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (this.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('Email updated successfully');
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
