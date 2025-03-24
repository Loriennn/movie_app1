import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Add your full name"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Add an email"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minlength: [6, "Password must be at least 6 characters"],
        },
        image: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likeMovies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Movie",
                unique: true, // prevent from adding movies
            },
        ],
    },
    {
        timestamps: true,
    }
);

// 
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model("User", UserSchema);
