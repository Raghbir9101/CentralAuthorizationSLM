import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import ToolsModel from "../Models/ToolsModel.js";
import CRUD from "../Utils/CRUD.js";

let ToolsRouter = new Router();

let instance = new CrudApi("/tools", ToolsModel, ToolsRouter)
let crudInstance = new CRUD(ToolsModel)


ToolsRouter.post("/createUnique", async (req, res) => {
    try {
        const prevData = await ToolsModel.findOne({ toolID: req.body.toolID });
        if(prevData) throw new Error("Tool with same Tool ID already exists.")
        const newData = await crudInstance.create(req.body);
        console.log(req.body)
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default ToolsRouter;