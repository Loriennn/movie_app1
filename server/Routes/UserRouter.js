import express from 'express';
import { registerUser, loginUser, updateUserProfile, deleteUserProfile, changeUserPassword,
 getLikeMovies, addLikeMovies, deleteLikedMovies, getUser, deleteUser} from '../Controllers/UserController.js';
import { protect} from "../middlewares/Auth.js";

const router = express.Router ();

// Public Routes //

router.post("/", registerUser);
router.post("/login", loginUser);

// Private Route//

router.put( "/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get(" /favorites", protect, getLikeMovies );
router.get(" /favorites", protect, addLikeMovies );
router.get(" /favorites", protect, deleteLikedMovies );

//** admin route */
router.get("/", protect, admin, getUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;