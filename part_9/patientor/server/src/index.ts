import express from 'express';
import cors from 'cors';

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`[server] Listening at http://localhost:${PORT}`);
}); 