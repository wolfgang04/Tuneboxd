import { useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const ReviewForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const existingReviews = location.state?.reviews || [];
  const [reviewText, setReviewText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview = {
      id: existingReviews.length + 1,
      user: "HelloWorld101", // Replace with user context if available
      rating,
      comment: reviewText,
      date: new Date().toISOString(),
    };

    const updatedReviews = [...existingReviews, newReview];
    navigate("/Songpage", { state: { reviews: updatedReviews } });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 p-5">
      <div className="w-full max-w-xl bg-white rounded-lg p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Submit Your Review</h1>

        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={handleTextChange}
            rows={6}
          />
          <div className="flex justify-center mb-6 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`text-3xl ${rating >= star ? "text-yellow-400" : "text-gray-400"}`}
              >
                ★
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="bg-black text-white py-2 px-6 rounded-md text-lg font-semibold hover:bg-gray-800 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
