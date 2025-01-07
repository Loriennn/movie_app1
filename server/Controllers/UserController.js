import asyncHandler from "express-async-handler"
import User from "../Models/UserModels"

const registerUser = asyncHandler (async (req, res) =>{
    const { fullName, email, password, image} = req.body
    try {
        const userExist = await User.findOne ( { email})

        //check if users exists

        if (userExist){
            res.status(400);
            throw new Error ("User already exists");
        }

        // else create user

        res.status(201).json ({
            fullName,
            email,
            password,
            image,
        });
    } catch (error) {

    }
});

export { registerUser};