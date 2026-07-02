import jwt from 'jsonwebtoken';

const SECRET = 'superSecretDreamHome';

export default function authMiddlewares(req, res, next) {
    const token = req.cookies['auth'];
    if (!token) {
        return next();
    }


    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        res.locals.user = decoded;

        next();
        
    } catch (error) {
        console.log(error.message);

        res.clearCookie('auth');
        res.redirect('/login');
    }
};