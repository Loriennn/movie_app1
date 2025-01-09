import jwt from "jsonwebtoken";

//authenticated user and get token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};

export { generateToken};
