import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 80;

import { connection } from './db.js';
import UsersRouter from './Controllers/UserController.js';
import AuthRouter from './Controllers/AuthController.js';
import ToolsRouter from './Controllers/ToolController.js';
import ClientsRouter from './Controllers/ClientsController.js';
import ClientAuthRouter from './Controllers/ClientAuthController.js';
import GroupsRouter from './Controllers/GroupsController.js';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import ToolsModel from './Models/ToolsModel.js';
import UsersModel from './Models/UsersModel.js';
import GroupsModel from './Models/GroupsModel.js';
import ClientsModel from './Models/ClientsModel.js';
import { authenticateToken } from "./Authorization/AuthenticateToken.js"
const _dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '50mb' }));
app.use(express.static('../FrontEnd/dist'));
app.use(cors());

app.get("/api/dashboard", authenticateToken, async (req, res) => {
    // try {
    const dashboardData = {
        userName: req.user?.fullName || "",
        toolsCount: await ToolsModel.countDocuments(),
        employeesCount: await UsersModel.countDocuments(),
        groupsCount: await GroupsModel.countDocuments(),
        clientsCount: await ClientsModel.countDocuments()
    }
    console.log(dashboardData)
    res.send(dashboardData)
    // } catch (error) {
    //     console.log(JSON.stringify(error, null, 5))
    //     res.json({ error })
    // }
})

app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})

app.get("/client/*", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})



app.use("/api", AuthRouter);
app.use("/api", UsersRouter);
app.use("/api", ToolsRouter);
app.use("/api", ClientsRouter);
app.use("/api", ClientAuthRouter);
app.use("/api", GroupsRouter);







app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})