import React from "react";
import { useNavigate } from "react-router-dom";

const Albums: React.FC<{albums:any}> = ({albums}) => {
  const navigate = useNavigate();
  
  return <section>
  <h2 className="text-2xl font-semibold mb-6">Albums</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {albums.map((album: any, index: number) => (
      <div
        key={index}
        className="flex flex-col justify-end bg-stone-900 text-white rounded-3xl hover:bg-stone-800 transition-colors duration-200"
        style={{ height: "230px", backgroundImage: `url(${album.images[0].url})`, backgroundSize: "cover" }}
      ><div className="bg-black bg-opacity-50 p-5 w-full rounded-bl-3xl rounded-br-3xl">
          <div className="text-base text-gray-300 text-white font-bold cursor-pointer hover:underline"
            onClick={() => navigate(`/album/${album.id}`, { state: { album: album.name } })}
          >{album.name}</div>
        </div>
      </div>
    ))}
  </div>
</section>
}

export default Albums;