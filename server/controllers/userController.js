const User = require('../models/usersModel');

exports.createUser = async (req, res) => {
  try {
    const { first_name, paternal_last_name, email } = req.body;
    
    if (!first_name || !paternal_last_name || !email) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar si el email ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const userId = await User.create(req.body);
    const newUser = await User.findById(userId);
    
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar si el nuevo email ya existe en otro usuario
    if (req.body.email && req.body.email !== userExists.email) {
      const existingUser = await User.findByEmail(req.body.email);
      if (existingUser) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }
    }

    const updated = await User.update(id, req.body);
    if (updated) {
      const updatedUser = await User.findById(id);
      return res.json(updatedUser);
    }
    res.status(400).json({ error: 'No se pudo actualizar el usuario' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const deleted = await User.delete(id);
    if (deleted) {
      return res.json({ message: 'Usuario eliminado correctamente' });
    }
    res.status(400).json({ error: 'No se pudo eliminar el usuario' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};