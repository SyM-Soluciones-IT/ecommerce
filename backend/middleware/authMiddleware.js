const jwt = require("jsonwebtoken");
const db = require("../config/database");

const authMiddleware = (requireAdmin = false) => {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Acceso no autorizado, token faltante" });
        }

        const token = authHeader.split(" ")[1];

        try {
            // Decodificar el token para obtener el ID del usuario
            const decoded = jwt.decode(token);
            const userId = decoded.id;

            // Obtener la clave secreta del usuario desde la base de datos
            const pool = await db();
            const [rows] = await pool.query("SELECT * FROM users WHERE id = ? AND VISIBLE = 1", [userId]);

            if (rows.length === 0 || !rows[0].secret_key) {
                return res.status(403).json({ message: "Token inválido/expirado o el usuario no existe" });
            }

            const user = rows[0];

            // Verificar el token con la clave secreta del usuario
            jwt.verify(token, user.secret_key);

            // Si se requiere ser administrador, verificamos el rol
            if (requireAdmin && user.role !== "admin") {
                return res.status(403).json({ message: "Acceso denegado. No eres administrador." });
            }

            // Guardar los datos del usuario en req.user
            req.user = { id: user.id, role: user.role };

            next();
        } catch (err) {
            return res.status(401).json({ message: "Token inválido o expirado" });
        }
    };
};

module.exports = authMiddleware;
