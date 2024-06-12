import type { NextApiRequest, NextApiResponse } from 'next';
const jwt = require('jsonwebtoken');

const secret = "secret" || 'your-secret-key';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
      const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
      res.status(200).json({ user: { username }, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
