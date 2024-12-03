import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import francescaImg from "../components/images/francesca.png";

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

const reviewsData: Review[] = [
  { id: 1, user: "Alice", rating: 5, comment: "Amazing album!", date: "2024-01-01" },
  { id: 2, user: "Bob", rating: 4, comment: "Really enjoyed it.", date: "2024-02-15" },
  { id: 3, user: "Charlie", rating: 3, comment: "It was okay.", date: "2024-03-10" },
];

const AlbumReview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState<"highest" | "lowest" | "newest">("newest");

  // Retrieve reviews passed through navigation state or fallback to static data
  const reviews = location.state?.reviews || reviewsData;

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    if (sortOption === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen bg-white text-black flex flex-col p-6">
      <div className="flex items-center space-x-4">
        <img src={francescaImg} alt="francesca" className="w-40 h-40 rounded-lg" />
        <div>
          <h1 className="text-4xl font-bold">Francesca</h1>
          <p className="text-lg text-gray-600">by Hozier</p>
          <p className="text-gray-500">Released: 2024 | Genre: Alternative/Indie</p>
          <button
  className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
  onClick={() => navigate("/pages/reviewform", { state: { reviews: reviewsData } })}
>
  Write Review
</button>
          
        </div>
      </div>

      <div className="mt-8 flex-grow">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-gray-700">{reviewsData.length} Reviews</p>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as "highest" | "lowest" | "newest")}
            className="bg-gray-200 p-2 rounded-lg text-black"
          >
            <option value="newest">Newest</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>

        <div className="mt-4 space-y-4">
          {sortedReviews.map((review) => (
            <div key={review.id} className="p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-bold">{review.user}</p>
                <p className="text-black">{`⭐`.repeat(review.rating)}</p>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <p className="mt-1 text-sm text-gray-500">{new Date(review.date).toDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumReview;
