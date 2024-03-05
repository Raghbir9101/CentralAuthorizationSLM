import mongoose from "mongoose";

const groupsSchema = mongoose.Schema({
    groupName: { type: String, index: true },
    tools: { type: Array },
    validity: { type: String, index: true },
})


const GroupsModel = mongoose.model("group", groupsSchema);

export default GroupsModel;
