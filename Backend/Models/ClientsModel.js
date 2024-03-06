import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    access: { type: Array, default: [] },
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
}, { strict: false })
const ClientsModel = mongoose.model("client", clientSchema);

export default ClientsModel;