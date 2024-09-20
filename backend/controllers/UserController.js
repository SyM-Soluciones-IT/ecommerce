const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const UserModel = require("../models/User");
const db = require("../config/database");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.getUsers();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Usuarios no encontrados" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

const createUser = async (req, res) => {
  const userInfo = req.body;

  try {
      // Validar los campos requeridos
      if (!userInfo.name || !userInfo.email || !userInfo.password || !userInfo.role) {
          return res.status(400).json({ message: "Faltan campos obligatorios." });
      }

      const pool = await db();

      // Verificar si el email ya está registrado
      const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [userInfo.email]);
      if (existingUser.length > 0) {
          return res.status(400).json({ message: "El correo ya está registrado." });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(userInfo.password, 10);

      // Generar una clave secreta única para el usuario
      const userSecretKey = crypto.randomBytes(64).toString("hex");

      // Insertar el nuevo usuario en la base de datos
      const [result] = await pool.query(
          "INSERT INTO users (name, email, password, role, secret_key, refreshToken) VALUES (?, ?, ?, ?, ?, ?)",
          [userInfo.name, userInfo.email, hashedPassword, userInfo.role || "user", userSecretKey, userSecretKey]
      );

      res.status(201).json({ message: "Usuario creado exitosamente", userId: result.insertId });
  } catch (error) {
      console.error("Error al crear el usuario:", error);
      res.status(500).json({ error: "Error en la base de datos" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, password, role, secret_key, refreshToken } = req.body;

  try {
      const pool = await db();

      // Verificar si el usuario existe
      const [user] = await pool.query("SELECT * FROM users WHERE id = ? AND visible = 1", [userId]);

      if (user.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado." });
      }

      // Si se proporciona una nueva contraseña, encriptarla
      let hashedPassword = user[0].password; // Mantener la contraseña actual
      if (password) {
          hashedPassword = await bcrypt.hash(password, 10);
      }

      // Actualizar el usuario
      await pool.query(
          "UPDATE users SET name = ?, email = ?, password = ?, role = ?, secret_key = ?, refreshToken = ? WHERE id = ? AND visible = 1",
          [name || user[0].name, email || user[0].email, hashedPassword, role || user[0].role, secret_key || user[0].secret_key, refreshToken || user[0].refreshToken, userId]
      );

      res.status(200).json({ message: "Usuario actualizado exitosamente." });
  } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      res.status(500).json({ error: "Error al actualizar el usuario." });
  }
};



const deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ message: "Usuario eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error en la base de datos" });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
