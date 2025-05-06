const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findAdminByEmail(email);
    if (!admin) return res.status(402).json({ error: 'Credenciales inválidas' });

    //const isMatch = await bcrypt.compare(password, admin.password_hash);
    const isMatch = await Admin.findAdminBypassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

    // Aquí puedes actualizar last_login si quieres

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: admin.id, firstName: admin.first_name, lastName: admin.last_name } });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

module.exports = { login };
