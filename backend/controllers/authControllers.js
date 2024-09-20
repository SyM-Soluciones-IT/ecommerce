const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/database");
const crypto = require("crypto");

// Función para generar access token con duración corta (30 minutos)
const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        user.secret_key, // Usa la clave secreta única del usuario
        { expiresIn: '30d' } // Caduca en 30 minutos
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        user.secret_key, // Define otra clave secreta para el refresh token
        { expiresIn: '30d' } // Caduca en 7 días
    );
};

// Función para registrar nuevos usuarios
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const pool = await db();

        // Verificar si el email ya está registrado
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado." });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generar una clave secreta única para el usuario
        const userSecretKey = crypto.randomBytes(64).toString("hex");

        // Insertar el nuevo usuario en la base de datos con su clave secreta
        await pool.query(
            "INSERT INTO users (name, email, password, role, secret_key, refreshToken) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hashedPassword, role || "user", userSecretKey, userSecretKey]
        );

        res.status(201).json({ message: "Usuario registrado exitosamente." });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).json({ error: "Error al registrar el usuario." });
    }
};

// Función para iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await db();
        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos." });
        }

        const user = rows[0];

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos." });
        }

        // Generar el access token y el refresh token
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Guardar el refresh token en la base de datos
        await pool.query("UPDATE users SET refreshToken = ? WHERE id = ?", [refreshToken, user.id]);

        // Devolver los tokens y los datos del usuario
        res.status(200).json({
            accessToken,
            refreshToken,
            user: { id: user.id, name: user.name, role: user.role }
        });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error al iniciar sesión." });
    }
};

// Función para refrescar el access token utilizando el refresh token
const refresh = async (req, res) => {
    const { refreshToken } = req.body;
  
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token requerido" });
    }
  
    try {
      const pool = await db();
      const [user] = await pool.query("SELECT * FROM users WHERE refreshToken = ?", [refreshToken]);
  
      console.log("User found:", user); // Agregar este log para verificar si el usuario existe
  
      if (!user) {
        return res.status(403).json({ message: "Refresh token inválido" });
      }
  
      jwt.verify(refreshToken, user.secret_key, (err, decoded) => {
        if (err) {
          console.error("Error al verificar el refresh token:", err); // Log del error
          return res.status(403).json({ message: "Refresh token expirado o inválido" });
        }
  
        const newAccessToken = generateAccessToken(user);
        res.json({ accessToken: newAccessToken });
      });
    } catch (error) {
      console.error("Error en el servidor:", error); // Log del error en el servidor
      res.status(500).json({ error: "Error en el servidor" });
    }
  };
  

// Función para cerrar sesión (eliminar el refresh token)
const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token requerido" });
    }

    try {
        const pool = await db();
        await pool.query("UPDATE users SET refreshToken = NULL WHERE refreshToken = ?", [refreshToken]);

        res.status(200).json({ message: "Cierre de sesión exitoso." });
    } catch (error) {
        res.status(500).json({ error: "Error al cerrar sesión." });
    }
};

module.exports = { register, login, logout, refresh };
