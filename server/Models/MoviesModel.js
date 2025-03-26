import mongoose from "mongoose";

// 影评 Schema
const reviewSchema = new mongoose.Schema(
    {
        userName: { type: String, required: true },
        userImage: { type: String, required: true },
        rating: { type: Number, required: true, min: 0, max: 5 },
        comment: { type: String, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// 电影 Schema
const moviesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
            index: true, // 添加索引，加速查询
        },
        desc: {
            type: String,
            required: true,
        },
        titleImage: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        
        language: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        video: {
            type: String,
            required: false,
        },
        rate: {
            type: Number,
            default: 0,
            required: false,
        },
        numberOfReviews: {
            type: Number,
            default: 0,
            required: false,
        },
        reviews: [reviewSchema],
        casts: [
            {
                name: { type: String, required: true },
                image: { type: String, required: true },
                character: { type: String, required: true }, // 新增字段
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Movie", moviesSchema);

