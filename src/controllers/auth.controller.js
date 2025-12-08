import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authController = {
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Faltan credenciales' });

    const validUser = process.env.AUTH_USERNAME;
    const validPass = process.env.AUTH_PASSWORD;

    if (!validUser || !validPass) {
      return res.status(500).json({ error: 'No hay credenciales configuradas en env' });
    }

    if (username !== validUser || password !== validPass) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = { username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    res.json({ token: `Bearer ${token}` });
  }
};
