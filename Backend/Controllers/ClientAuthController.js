import { Router } from "express";
import ClientsModel from "../Models/ClientsModel.js";
import jwt from 'jsonwebtoken';
import GroupsModel from "../Models/GroupsModel.js";
const secret = 'password';

let ClientAuthRouter = new Router();

class ClientAuthorization {
    static async login(req, res) {
        const { email, password } = req.body;
        let authToolName = req.query.tool || "";
        if (!authToolName) {
            return res.json({ error: 'Invalid Tool' });
        }
        let user = await ClientsModel.findOne({ email }).lean();

        if (!user) {
            return res.json({ error: 'User Not Found' });
        }
        if (user.password != password) {
            return res.json({ error: 'Password is Incorrect' });
        }

        let authGroups = user.access.map(item => item.groupID);
        const allGroups = await GroupsModel.find(mongooseOrObj("_id", authGroups))

        let finalExpiry = new Date();
        finalExpiry.setDate(finalExpiry.getDate() - 10000)
        let isToolAuthorized = false;

        for (let i = 0; i < user.access.length; i++) {
            let tempGroup = allGroups.find(item => item._id == authGroups[i]);
            let tempDate = new Date(user.access[i].endDate);
            let set = new Set(tempGroup.tools.map(item => item.toolID))
            if (set.has(authToolName)) {
                isToolAuthorized = true;
                if ((tempDate > finalExpiry)) {
                    finalExpiry = tempDate;
                }
            }
        }
        delete user.password;
        delete user.access;
        let expiry = hasExpired(finalExpiry);
        if (!isToolAuthorized || expiry) {
            const token = jwt.sign({ userId: user._id, toolID: authToolName }, secret);
            return res.json({
                body: user,
                token,
                accessStatus: "BASIC",
                accessError: "User does not have access to this tool or Access Expired for this tool."
            })
        }

        const token = jwt.sign({ userId: user._id, toolID: authToolName }, secret);

        return res.json({
            body: user,
            token,
            accessStatus: "PRO",
        });
    }
    static async register(req, res) {
        const data = { ...req.body };
        try {
            let prevData = await ClientsModel.findOne({ email: data.email });
            if (prevData) return res.send({ error: "User with this email already exists" });
            else {
                const member = new ClientsModel(data);
                await member.save();
                res.send(data);
            }
        } catch (err) {
            console.log(err)
            res.status(500).send("Internal Server Error");
        }
    }
    static async getClientDataByToken(req, res) {
        try {
            let user = req.user;
            delete user.password;
            delete user.access;
            return res.send(user)
        } catch (error) {
            res.json(error)
        }

    }
}

ClientAuthRouter.post("/client/signin", ClientAuthorization.login)
ClientAuthRouter.post("/client/signup", ClientAuthorization.register)
ClientAuthRouter.get("/client/getDataByToken", authenticateToken, ClientAuthorization.getClientDataByToken)


export default ClientAuthRouter;


function hasExpired(endDate) {
    return new Date(endDate) < new Date();
}


export function authenticateToken(req, res, next) {
    const authHeader = req?.headers?.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res?.sendStatus(401);

    jwt.verify(token, secret, async (err, decoded) => {
        if (err) return res.sendStatus(403);
        const user = await ClientsModel.findById(decoded.userId).lean();
        if (!user) return res.sendStatus(404);
        let authGroups = user.access.map(item => item.groupID);
        const allGroups = await GroupsModel.find(mongooseOrObj("_id", authGroups))

        let finalExpiry = new Date();
        let isToolAuthorized = false;

        for (let i = 0; i < user.access.length; i++) {
            let tempGroup = allGroups.find(item => item._id == authGroups[i]);
            let tempDate = new Date(user.access[i].endDate);
            let set = new Set(tempGroup.tools.map(item => item.toolID))
            if (set.has(decoded.toolID)) {
                isToolAuthorized = true;
                if ((tempDate > finalExpiry)) {
                    finalExpiry = tempDate;
                }
            }
        }
        if (!isToolAuthorized) return res.json({ error: "User does not have access to this tool." });

        let expiry = hasExpired(finalExpiry)
        if (expiry) return res.json({ error: "Access Expired for this tool." });

        req.user = user;
        next();
    });
}

function mongooseOrObj(param, arr) {
    let temp = [];
    for (let i of arr) {
        temp.push({ [param]: i })
    }
    return {
        $or: temp
    }
}