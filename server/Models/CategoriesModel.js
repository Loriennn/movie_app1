import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Category name is required"],
            unique: true,
            trim: true,
            lowercase: true,  // 统一存储为小写，避免重复
            minlength: [2, "Category name must be at least 2 characters"],
            maxlength: [50, "Category name must be at most 50 characters"],
            index: true,  // 加快查询速度
        },
    },
    { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
