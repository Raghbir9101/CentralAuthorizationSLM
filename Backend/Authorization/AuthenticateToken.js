import jwt from 'jsonwebtoken';
import UsersModel from '../Models/UsersModel.js';
const secret = 'password';

let authenticateToken = (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res?.sendStatus(401);

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const user = await UsersModel.findById(decoded.userId);
        if (!user) return res.sendStatus(404);
        req.user = user;
        next();
    });
}

export { authenticateToken, authenticateTokenToolList }