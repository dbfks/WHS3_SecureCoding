const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('./generated/prisma');

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 테스트 라우트
app.get('/', (req, res) => {
  res.send('Secondhand platform API is running!');
});

// 유저 생성 API
app.post('/api/users', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { email, password, name },
    });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});