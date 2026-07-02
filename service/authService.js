import User from "../module/UserModule.js";
import bcrypt from "bcrypt";

export default {
    async register(UserData) {

        if (UserData.password !== UserData.repassword) {
            throw new Error("Passwords do not match");
        }

        const UserCount = await User.countDocuments({ email: UserData.email });

        if (UserCount > 0) {
            throw new Error("Email already exist");
        }

        const user = await User.create(UserData);

        return user;
    },

    async login(UserData) {

        const user = await User.findOne({ email: UserData.email });

        if (!user) {
            throw new Error("Invalid email");
        }

        const isPassword = await bcrypt.compare(UserData.password, user.password);

        if (!isPassword) {
            throw new Error("Invalid password");
        }

        return user;
    }

};