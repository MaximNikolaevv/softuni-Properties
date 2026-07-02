import jwt from "jsonwebtoken";
import User from "../module/UserModule.js";

const SECRET = 'superSecretDreamHome';

export async function createToken(UserData) {

    const user = await User.findOne({ email: UserData.email });

    const payload = {
        _id: user._id,
        email: user.email,

    };

    const jwbToken = jwt.sign(payload, SECRET, { expiresIn: '2d' });

    return jwbToken;
}


