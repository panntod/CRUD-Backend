import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT || 5000;

import userRoute from './routes/UserRoute.js';

app.use(cors());
app.use(express.json());

app.use(userRoute);
app.use('/', (_, res) => {
  res.send('Welcome to the crud backend!');
});

app.listen(PORT, () =>
  console.log('✅ Server is running on http://localhost:' + PORT)
);
