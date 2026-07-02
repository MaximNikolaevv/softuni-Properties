import { Router } from 'express';
import authServices from '../service/authService.js';
import { createToken } from '../JsWebToken/JsWebToken.js';


const authControllers = Router();


authControllers.get('/login', (req, res) => {
    res.render('login');
});

authControllers.post('/login', async (req, res) => {

    const UserData = req.body;

    try {
        const User = await authServices.login(UserData);
        const jwt = await createToken(User);
        res.cookie("auth", jwt, { httpOnly: true });
        res.redirect("/");

    } catch (error) {

        res.render("login", { error: error.message });
    }



});

authControllers.get('/register', (req, res) => {
    res.render('register');
});



authControllers.post('/register', async (req, res) => {
    const UserData = req.body;

    try {
        const User = await authServices.register(UserData);
        const jwt = await createToken(User);
        res.cookie("auth", jwt, { httpOnly: true });
        res.redirect("/");

    } catch (error) {

        res.render("register", { error: error.message });

    }

});


authControllers.get("/Logout", (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});



export default authControllers;