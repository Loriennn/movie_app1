import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/UserModels.js";
import { generateToken } from "../middlewares/Auth.js";

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;

    try {
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user in the database
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        // If user is created successfully, send response
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {registerUser};

// Login user
// Route: POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user in DB
        const user = await User.findOne({ email });

        // If user exists, compare password with the hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            // If user is not found or password doesn't match, send an error message
            res.status(401);
            throw new Error("Invalid email or password");
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { loginUser };

// *private controller
// update user profile
// route: PUT /api/users/profile

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;

    try {
        // Find user in DB
        const user = await User.findById(req.user._id);

        // If user exists, update user data and save it to DB
        if (user) {
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updatedUser = await user.save();

            // Send updated user data and token to client
            res.json({
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                image: updatedUser.image,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            });
        } else {
            // If user not found, send error
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: error.message } );
    }
});

export { updateUserProfile} ;

     

// Delete user profile
// Route: DELETE /api/users
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        // Find the user in the database
        const user = await User.findById(req.user._id);

        if (user) {
            // If the user is an admin, prevent deletion
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Cannot delete admin user");
            }

            // Delete the user from the database
            await user.remove();
            res.json({ message: "User deleted successfully" });
        } else {
            // If user not found, throw an error
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle any errors
        res.status(400).json({ message: error.message });
    }
});

export { deleteUserProfile };

// Change user password
// Route: PUT /api/users/password
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    try {
        // Find the user in the database
        const user = await User.findById(req.user._id);

        if (user) {
            // Compare old password with hashed password in DB
            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                res.status(401);
                throw new Error("Invalid old password");
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update the user's password and save it to the database
            user.password = hashedPassword;
            await user.save();

            res.json({ message: "Password changed successfully" });
        } else {
            // If user not found, send an error
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: error.message });
    }
});

export { changeUserPassword };

// Get all liked movies
// Route: GET /api/users/favourites
const getLikeMovies = asyncHandler(async (req, res) => {
    try {
        // Validate if req.user exists
        if (!req.user || !req.user._id) {
            res.status(401);
            throw new Error("Not authorized");
        }

        // Find the user in the database and populate likedMovies
        const user = await User.findById(req.user._id).populate("likedMovies");

        if (user) {
            // Send the liked movies to the client
            res.json(user.likedMovies);
        } else {
            // If user not found, send an error message
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle errors
        res.status(400).json({ message: error.message });
    }
});

export { getLikeMovies };

// add movie to liked movies
// route POST /api/users/favourites
// Private

const addLikeMovie = asyncHandler ( async (req, res) =>{
    const { movieId} = req.body;

    try {
        //find user in DB

        const user = await User.findById (req.user._id);
        // if user exists add movie to liked movies and save it in DB
        if (user) {
            //check if movie already liked
            //if movie already liked, send error message
            if ( user.likedMovies.includes(movieId)){
                res.status(400);
                throw new Error (" Movie already liked");
            }

            //else add movie to liked movies and save it in DB
            user.likeMovies.push(movieId);
            await user.save();
            res.json( user.likedMovies);
        }

        //else send error message

        else {
            res.status(404);
            throw new Error (" Movie not found");
        }
    }  catch (error) {
        res.status(400).json ({messgae: error.message});
    }
});

export {
    addLikeMovie, //
}

//delete all liked movies
// route DELETE /api/users/favourites
// private

const deleteLikedMovies = asyncHandler ( async (req, res)=>{
    try {
        //find user in DB
        const user = await User.findById(req.user._id);
        //if user exists, delete all liked movies and save in DB
        if (user) {
            user.likedMovies = [];
            await user.save();
            res.json({message: "All liked movies deleted successfully"});
        }

        //else send error message 

        else {
            res.status(400);
            throw new Error (" User not found");
        }
    } catch (error) {
        res.status(400).json( {message: error.message});
    }
});

// **Admin Controller** //
// Get all users
// Route: GET /api/users
// Access: Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    try {
        // Find all users in the database
        const users = await User.find({});
        res.json(users); // Send the users as the response
    } catch (error) {
        res.status(500).json({ message: error.message }); // Internal Server Error
    }
});

export { getUsers };


// Delete User by Admin
// Route: DELETE /api/users/:id
// Access: Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    try {
        // Find user in the database
        const user = await User.findById(req.params.id);

        // If user exists, proceed with deletion
        if (user) {
            // Check if the user is an admin
            if (user.isAdmin) {
                res.status(400);
                throw new Error("Cannot delete admin user");
            }

            // Delete the user
            await user.remove();
            res.json({ message: "User deleted successfully" });
        } else {
            // If user is not found
            res.status(404);
            throw new Error("User not found");
        }
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: error.message });
    }
});

export { deleteUser };
