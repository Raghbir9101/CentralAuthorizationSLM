import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import GroupsModel from "../Models/GroupsModel.js";
import CRUD from "../Utils/CRUD.js";

let GroupsRouter = new Router();
let instance = new CrudApi("/groups", GroupsModel, GroupsRouter)
let CRUDinstance = new CRUD(GroupsModel)

GroupsRouter.post("/createUniqueGroups", async (req, res) => {
    try {
        const prevData = await GroupsModel.findOne({ groupName: req.body.groupName });
        console.log(prevData)
        if (!!prevData != false) throw new Error("User with same email ID already exists.")
        const newData = await CRUDinstance.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default GroupsRouter;