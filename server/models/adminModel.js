const db = require('../config/db');

async function findAdminByEmail(email) {
  const [rows] = await db.query('SELECT * FROM admins WHERE email = ?', [email]);
  return rows[0];
}

async function findAdminBypassword(pass) {
    const [rows] = await db.query('SELECT * FROM admins WHERE password_hash = ?', [pass]);
    return rows[0];
  }

module.exports = {
  findAdminByEmail,
  findAdminBypassword
};
