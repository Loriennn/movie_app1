const createMovieReview = asyncHandler(async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        const { rating, comment } = req.body; // ✅ Extract rating and comment

        if (movie) {
            const alreadyReviewed = movie.reviews.find(
                (r) => r.userId.toString() === req.user._id.toString()
            );

            if (alreadyReviewed) {
                res.status(400);
                throw new Error("You already reviewed this movie");
            }

            // Create a new review
            const review = {
                userName: req.user.fullName,
                userId: req.user._id,
                userImage: req.user.image, // ✅ Fixed typo
                rating: Number(rating),
                comment,
            };

            // Push the new review to the reviews array
            movie.reviews.push(review);
            movie.numberOfReviews = movie.reviews.length;

            // Calculate the new average rating
            movie.rate = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length; // ✅ Fixed rating calculation

            // Save the updated movie
            await movie.save();

            res.status(201).json({ message: "Review added" });
        } else {
            res.status(400);
            throw new Error("Movie not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
