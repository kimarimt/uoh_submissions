import express from 'express';

const PORT = 3000;

const app = express();

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`[server] Listening at http://localhost:${PORT}`);
}); 