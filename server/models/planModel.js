const db = require('../config/db');


const Plan = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM plans');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM plans WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (plan) => {
        const { name, description, duration_days, price, is_active } = plan;
        const [result] = await db.query(
            'INSERT INTO plans (name, description, duration_days, price, is_active) VALUES (?, ?, ?, ?, ?)',
            [name, description, duration_days, price, is_active ?? true]
        );
        return result.insertId;
    },

    update: async (id, plan) => {
        const { name, description, duration_days, price, is_active } = plan;
        await db.query(
            'UPDATE plans SET name = ?, description = ?, duration_days = ?, price = ?, is_active = ? WHERE id = ?',
            [name, description, duration_days, price, is_active, id]
        );
    },

    delete: async (id) => {
        await db.query('DELETE FROM plans WHERE id = ?', [id]);
    }
};

module.exports = Plan;