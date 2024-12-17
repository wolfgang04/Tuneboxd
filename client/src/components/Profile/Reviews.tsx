import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import server from "../../SERVER";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const user_id = useLocation().pathname.split("/")[1];
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews()
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`${server}review/getUsers`, { params: { user_id } });
      setReviews(data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {reviews.map((review: any) => (
        <div key={review.id} className="bg-[black] text-white p-4 rounded w-[400px] mb-4 cursor-pointer"
          onClick={() => navigate(`/track/${review.mediatype_id}`)}>
          <p className="text-sm">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;