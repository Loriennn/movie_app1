import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define what a User looks like in the database
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name"],
      trim: true, // removes spaces before/after
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true, // no duplicate emails allowed
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    image: {
      type: String, // URL or path to the user's profile image
    },
    isAdmin: {
      type: Boolean,
      default: false, // regular user by default
    },
    likeMovies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie", // references the Movie model
        unique: true, // each movie should only be liked once
      },
    ],
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt fields
  }
);

// Before saving the user, hash the password if it's new or changed
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // skip if password hasn't changed

  this.password = await bcrypt.hash(this.password, 10); // hash the password
  next(); // continue saving
});

// Export the User model
export default mongoose.model("User", UserSchema);
