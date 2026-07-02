import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";


const UserSchema = new Schema({

    email: {
        type: String,
        require: true,

    },
    password: {
        type: String,
        require: true,

    }

});


UserSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);

});

const User = model("DreamHome", UserSchema, "Users");

export default User;
