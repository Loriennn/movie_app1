import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Add your full name"],
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
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);
