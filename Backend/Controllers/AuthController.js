import { Router } from "express";
import UsersModel from "../Models/UsersModel.js";
import jwt from 'jsonwebtoken';
const secret = 'password';

let AuthRouter = new Router();
// let AuthCRUD = new CRUD(UsersModel);

class Authorization {
    static async login(req, res) {
        const { email, password } = req.body;

        let user = await UsersModel.findOne({ email });
        user = JSON.parse(JSON.stringify(user));
        if (!user) {
            return res.json({ error: 'User Not Found' });
        }
        if (user.password != password) {
            return res.json({ error: 'Password is Incorrect' });
        }
        UsersModel.findOneAndUpdate({ email }, { tempOTP: "" });
        const token = jwt.sign({ userId: user._id }, secret);
        delete user.password;
        delete user.tempOTP;
        return res.json({
            body: user,
            token
        });
    }
    static async register(req, res) {
        const data = { ...req.body };
        try {
            let prevData = await UsersModel.findOne({ email: data.email });
            if (prevData) return res.send({ error: "User with this email already exists" });
            else {
                const member = new UsersModel(data);
                await member.save();
                res.send(data);
            }
        } catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error");
        }
    }
}

AuthRouter.post("/signin", Authorization.login)
AuthRouter.post("/signup", Authorization.register)


export default AuthRouter;