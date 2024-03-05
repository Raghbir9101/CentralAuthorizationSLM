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

app.use(express.json({ limit: '50mb' }));
app.use(express.static('build'));
app.use(cors());

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