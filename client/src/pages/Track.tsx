import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDuration } from "../components/Song/Song";

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

const Track = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [track, setTrack] = useState<any>({});
  const location = useLocation();
  const trackID = location.pathname.slice(7);
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState<"highest" | "lowest" | "newest">("newest");

  // Retrieve reviews passed through navigation state or fallback to static data
  const reviews = location.state?.reviews || reviewsData;
  const [songLikes, setSongLikes] = useState<number>(0);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    if (sortOption === "newest") return new Date(b.date).getTime() - new Date(a.date).getTime();
    return 0;
  });

  const handleSongLike = () => {
    setSongLikes((prevLikes) => prevLikes + 1);
  };

  const fetchTrack = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/spotify/track",
        {
          params: { id: trackID },
        },
      );

      setTrack(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [trackID]);

  useEffect(() => {
    fetchTrack();
  }, [trackID, fetchTrack]);

  if (isLoading) return <p>Loading...</p>;

  return <div className="min-h-screen bg-white text-black flex flex-col p-6">
    <div className="flex items-center space-x-4">
      <img src={track.album.images[0].url} alt="francesca" className="w-40 h-40 rounded-lg" />
      <div>
        <h1 className="text-4xl font-bold">{track.name}</h1>
        {track.artists.map((artist: any, idx: number) => <p key={idx} className="text-lg text-gray-600 cursor-pointer hover:underline"
          onClick={() => navigate(`/artist/${artist.id}`)}
        >{artist.name}</p>)}
        <p className="text-lg text-gray-600 cursor-pointer hover:underline"
          onClick={() => navigate(`/album/${track.album.id}`)}>
          Album: {track.album.name}
        </p>
        <p className="text-gray-500">Released: {track.album.release_date}</p>
        <p className="text-gray-500">Duration: {formatDuration(track.duration_ms)}</p>
        <button
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          onClick={() => navigate("/pages/reviewform", { state: { reviews: reviewsData } })}
        >
          Write Review
        </button>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            onClick={handleSongLike}
          >
            Like
          </button>
          <span className="ml-2 text-gray-700">{songLikes} Likes</span>
        </div>

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
  </div>;
};

export default Track;
