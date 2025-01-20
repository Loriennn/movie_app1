import mongoose from 'mongoose';



const reviewSchema = mongosse.Schema ({
    userName: { type: String, required : true},
    userImage: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: " User",
        required: true,
    },
},

{
    timestamps:true,
}
);


    const moviesSchema: mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            name: {
                type:String,
                required: true,
            },

            desc: {
                type: String,
                required: true,
            },

            titleImaga: {
                type: String,
                required: true,
            },

            image: {
                type:String,
                required: 

            },

            category:{
                type: String,
                required:true
            },

            language: {
                type: String,
                required: true
            },

            year: {
                type:Number,
                required: true
            },

            time : {
                type: Number,
                required: true
            },

            video:{
                type: String,
                //required: true
            },
            rate: {
                type: Number,
                required: true，
                default:0

        },

        numberOfReviews: {
            type: Number,
            required: true,
            default:0
        },

        reviews: [reviewSchema],

        casts: [
            {
                name: { type: String, required: true},
                image: { type: String, required: true},
            }
        ],
    },
    {   timestamps: true,

    }
    );

    export default mongoose.model("Movies", moviesSchema);

