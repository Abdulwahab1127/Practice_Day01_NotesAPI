import mongoose from "mongoose";
import Note from "./notes.js";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    notes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
})
const User = mongoose.model('User', userSchema);
export default User;