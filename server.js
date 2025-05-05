const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let posts = [];

try {
  posts = JSON.parse(fs.readFileSync('posts.json', 'utf8'));
} catch (err) {
  posts = [];
}

// Zwraca wszystkie posty
app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// Dodaje nowy post
app.post('/api/posts', (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: 'Brak treści' });

  const post = { id: Date.now(), content };
  posts.unshift(post);
  fs.writeFileSync('posts.json', JSON.stringify(posts, null, 2));
  res.json(post);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

