import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDuration } from "../components/Song/Song";

interface Review {
  user_id: string;
  rating: number;
  content: string;
  created_at: string;
}

const reviewsData: Review[] = [
  { user_id: "Alice", rating: 5, content: "Amazing album!", created_at: "2024-01-01" },
  { user_id: "Bob", rating: 4, content: "Really enjoyed it.", created_at: "2024-02-15" },
  { user_id: "Charlie", rating: 3, content: "It was okay.", created_at: "2024-03-10" },
];

const Track = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [track, setTrack] = useState<any>({});
  const location = useLocation();
  const trackID = location.pathname.slice(7);
  const navigate = useNavigate();

  const [sortOption, setSortOption] = useState<"highest" | "lowest" | "newest">("newest");

  // Retrieve reviews passed through navigation state or fallback to static data
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortOption === "highest") return b.rating - a.rating;
    if (sortOption === "lowest") return a.rating - b.rating;
    if (sortOption === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });

  const handleSongLike = async () => {
    const song = {
      title: track.name, song_id: trackID,
      artist: track.artists[0].name, artist_id: track.artists[0].id,
      album: track.album.name, album_id: track.album.id,
      cover: track.album.images[0].url
    };
    try {
      if (!isLiked) {
        const res = await axios.post("http://localhost:8080/api/song/like", {
          ...song
        }, { withCredentials: true });

        if (res.status === 201) {
          setIsLiked(true);
        }
      } else {
        const res = await axios.post("http://localhost:8080/api/song/unlike", { ...song }, { withCredentials: true });
        if (res.status === 200) {
          setIsLiked(false);
        }
      }
    } catch (error) {
      console.error(error);
    }
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [trackID]);


  const likedStatus = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/song/isLiked",
        { song_id: trackID }, { withCredentials: true });
      setIsLiked(res.data.isLiked);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/review/getSong", { params: { song_id: trackID } });
      console.log(data);
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  }, [trackID]);

  useEffect(() => {
    fetchTrack();
    likedStatus();
    fetchReviews();
  }, [trackID, fetchTrack]);

  if (isLoading) return <p>Loading...</p>;

  return <div className="min-h-screen bg-white text-black flex flex-col p-6">
    <div className="flex items-center space-x-4">
      <img src={track.album.images[0].url} alt="francesca" className="w-40 h-40 rounded-lg" />
      <div>
        <h1 className="text-4xl font-bold">{track.name}</h1>
        {track.artists.map((artist: any, idx: number) => <p key={idx} className="text-lg text-gray-600 cursor-pointer hover:underline"
          onClick={() => navigate(`/artist/${artist.id}`, { state: artist.name })}
        >{artist.name}</p>)}
        <p className="text-lg text-gray-600 cursor-pointer hover:underline"
          onClick={() => navigate(`/album/${track.album.id}`)}>
          Album: {track.album.name}
        </p>
        <p className="text-gray-500">Released: {track.album.release_date}</p>
        <p className="text-gray-500">Duration: {formatDuration(track.duration_ms)}</p>
        <button
          className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
          onClick={() => navigate("/reviewform", { state: { reviews: reviewsData, id: trackID } })}
        >
          Write Review
        </button>
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            onClick={() => handleSongLike()}
          >
            {isLiked !== null && (isLiked ? "Unlike" : "Like")}
          </button>
        </div>

      </div>
    </div>

    <div className="mt-8 flex-grow">
      <h2 className="text-2xl font-bold">Reviews</h2>
      <div className="mt-4 flex justify-between items-center">
        <p className="text-gray-700">{reviews.length} Reviews</p>
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
          <div className="p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center">
              <p className="font-bold">{review.user_id}</p>
              <p className="text-black">{`⭐`.repeat(review.rating)}</p>
            </div>
            <p className="mt-2 text-gray-700">{review.content}</p>
            <p className="mt-1 text-sm text-gray-500">{new Date(review.created_at).toDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  </div>;
};

export default Track;
