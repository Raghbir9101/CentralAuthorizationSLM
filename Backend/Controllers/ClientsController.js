import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import ClientsModel from "../Models/ClientsModel.js";
import CRUD from "../Utils/CRUD.js";

let ClientsRouter = new Router();
let instance = new CrudApi("/clients", ClientsModel, ClientsRouter)
let CRUDinstance = new CRUD(ClientsModel)

ClientsRouter.post("/createUniqueClients", async (req, res) => {
    try {
        const prevData = await ClientsModel.findOne({ email: req.body.email });
        if(!!prevData !=false ) throw new Error("User with same email ID already exists.")
        const newData = await CRUDinstance.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default ClientsRouter;