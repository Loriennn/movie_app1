import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../Controllers/UserController.js';
import { protect} from "../middlewares/Auth.js";

const router = express.Router ();

// Public Routes //

router.post("/", registerUser);
router.post("/login", loginUser);

// Private Route//

router.put( "/", protect, updateUserProfile);

export default router;