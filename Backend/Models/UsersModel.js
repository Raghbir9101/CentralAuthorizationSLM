import mongoose from "mongoose";
const db = await mongoose.createConnection(process.env.MONGODB_CONNECTION_STRING_1 + "newslm");
// const employeeDataCollection = await db.collection('employeedatas').find({})
// console.log(await employeeDataCollection.toArray())


const usersSchema = mongoose.Schema({
    fullName: { type: String, index: true },
    email: { type: String, index: true },
    phoneNo: { type: String },
    permissions: { type: Object },
    password: { type: String },
    isAdmin: { type: Boolean, index: true },
    OTPRequiredDate: { type: Object },
    tempOTP: { type: String }
})

const UsersModel = db.model("employeedata", usersSchema);

export default UsersModel 
