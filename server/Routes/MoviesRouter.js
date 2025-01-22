import express from 'express';
import { getMovies, importMovies} from "../Controllers/MovieController.js"

import { protect, admin} from "../middlewares/Auth.js";

const router = express.Router ();

// Public Routes //

router.post("/import", importMovies);
router.post("/", getMovies);

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