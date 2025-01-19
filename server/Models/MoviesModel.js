import mongoose from 'mongoose';

const reviewSchema = mongosse.Schema ({
    userName: { type: String, required : true},
    rating: { type: Number, required: true},
    review: { type: String, required: true},


    const movieSchema: mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        }
    )

})