const db = require('../config/db');


const User = {
  // Crear un nuevo usuario
  create: async (userData) => {
    const { first_name, paternal_last_name, maternal_last_name, phone, email } = userData;
    const [result] = await db.query(
      'INSERT INTO users (first_name, paternal_last_name, maternal_last_name, phone, email) VALUES (?, ?, ?, ?, ?)',
      [first_name, paternal_last_name, maternal_last_name, phone, email]
    );
    return result.insertId;
  },

  // Obtener todos los usuarios
  findAll: async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  },

  // Obtener un usuario por ID
  findById: async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // Actualizar un usuario
  update: async (id, userData) => {
    const { first_name, paternal_last_name, maternal_last_name, phone, email } = userData;
    const [result] = await db.query(
      'UPDATE users SET first_name = ?, paternal_last_name = ?, maternal_last_name = ?, phone = ?, email = ? WHERE id = ?',
      [first_name, paternal_last_name, maternal_last_name, phone, email, id]
    );
    return result.affectedRows > 0;
  },

  // Eliminar un usuario
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  // Buscar por email
  findByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
};

module.exports = User;