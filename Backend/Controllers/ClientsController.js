import { Router } from "express";
import CrudApi from "../Utils/CrudController.js";
import ClientsModel from "../Models/ClientsModel.js";
import CRUD from "../Utils/CRUD.js";
import GroupsModel from "../Models/GroupsModel.js";

let ClientsRouter = new Router();
let instance = new CrudApi("/clients", ClientsModel, ClientsRouter)
let CRUDinstance = new CRUD(ClientsModel)

ClientsRouter.post("/createUniqueClients", async (req, res) => {
    try {
        const prevData = await ClientsModel.findOne({ email: req.body.email });
        if (!!prevData != false) throw new Error("User with same email ID already exists.")
        const newData = await CRUDinstance.create(req.body);
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

ClientsRouter.get("/getClients", async (req, res) => {
    try {
        const authToolName = req.query.tool;
        const allGroups = await GroupsModel.find().lean();
        const allGroupsMap = new Map(allGroups.map(item => [item._id.toString(), item]));

        const allClients = await ClientsModel.find().lean();
        const finalClientsData = [];
        for (let user of allClients) {
            let authGroups = user.access.map(item => item.groupID);
            let finalExpiry = new Date();
            finalExpiry.setDate(finalExpiry.getDate() - 10000)
            let isToolAuthorized = false;

            for (let i = 0; i < user.access.length; i++) {
                let tempGroup = allGroupsMap.get(authGroups[i]) || null;
                console.log(tempGroup)
                if (!tempGroup) continue
                // let tempGroup = allGroups.find(item => item._id == authGroups[i]);
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
                continue
            }
            finalClientsData.push(user)
        }

        res.status(201).json(finalClientsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
ClientsRouter.get("/getClientsv1", async (req, res) => {
    try {
        const authToolName = req.query.tool;

        // Pipeline to fetch relevant clients and filter them
        const pipeline = [
            {
                $lookup: {
                    from: "groups",
                    localField: "access.groupID",
                    foreignField: "_id",
                    as: "groupInfo"
                }
            },
            {
                $unwind: "$groupInfo"
            },
            {
                $match: {
                    "groupInfo.tools.toolID": authToolName,
                    "access.endDate": { $gt: new Date() }
                }
            },
            {
                $project: {
                    password: 0,
                    access: 0
                }
            }
        ];

        const finalClientsData = await ClientsModel.aggregate(pipeline);

        res.status(201).json(finalClientsData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


function hasExpired(endDate) {
    return new Date(endDate) < new Date();
}



export default ClientsRouter;