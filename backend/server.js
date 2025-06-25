import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.js';
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

app.use('/api', indexRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
