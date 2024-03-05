import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import UsersModel from "../Models/UsersModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let UsersRouter = new Router();

let instance = new CrudApi("/users", UsersModel, UsersRouter);

UsersRouter.get("/checkUserExists", async (req, res) => {
    let { loginAs, email } = req.query;
    if (!loginAs) loginAs = "Admin";
    let employee;
    if (loginAs == "Admin") {
        employee = await UsersModel.findOne({ email });
    }
    res.send(employee ? { isAdmin: employee.isAdmin, exists: true, OTPRequiredDate: employee.OTPRequiredDate } : { isAdmin: false, exists: false })
})


export default UsersRouter;