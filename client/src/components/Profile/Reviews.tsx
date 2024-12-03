import React from "react";

const Reviews = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <div className="bg-[black] text-white p-4 rounded w-[400px]">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full mr-4">
            <img
              src="https://simplyilm.com/wp-content/uploads/2017/08/temporary-profile-placeholder-1.jpg"
              alt="Reviewer Profile"
              className="w-[40px] h-[40px] bg-gray-300 rounded-full"
            />
          </div>
          <p className="font-bold">Username</p>
        </div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ac
          mollis est. Pellentesque habitant morbi tristique senectus et netus
          et malesuada fames ac turpis.
        </p>
      </div>
    </div>
  );
};

export default Reviews;