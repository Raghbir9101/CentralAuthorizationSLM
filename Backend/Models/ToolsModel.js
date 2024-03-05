import mongoose from "mongoose";

const toolsSchema = mongoose.Schema({
    toolName: { type: String, index: true },
    toolID: { type: String, index: true, unique: true },
    toolLink: { type: String },
    createdOn: { type: String },
})
const ToolsModel = mongoose.model("tool", toolsSchema);

export default ToolsModel 
