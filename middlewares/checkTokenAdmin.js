const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function checkTokenAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];


    if (!token) {
        return res.status(401).json({ message: "Acesso negado" });
    }

    try {
        const secret = process.env.SECRET;

        const decoded = jwt.verify(token, secret);

        const user = await User.getById(decoded.id);

        if (user[0].is_admin == 0) {
            return res.status(403).json({ message: "Acesso proibido para não administradores" });
        }

        req.user = user[0];

        next();

    } catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
}

module.exports = checkTokenAdmin;
