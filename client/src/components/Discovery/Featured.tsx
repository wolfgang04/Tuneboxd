import { useNavigate } from "react-router-dom";

interface Props {
  songs: any[];
}

const Featured:React.FC<Props> = ({songs}) => {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold mb-4">Featured</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={index}
              style={{ backgroundImage: `url(${song.album.images[1].url})`, backgroundSize: "cover", backgroundPosition: "center" }}
              className="flex flex-col cursor-pointer items-start pt-44 pr-12 pb-4 pl-5 w-full text-white rounded-3xl bg-stone-900 shadow-md hover:shadow-lg max-md:pt-24 max-md:pr-5 max-md:mt-2.5"
              onClick={() => navigate(`/track/${song.id}`, { state: song.name })}
            >
              {/* Title */}
              <div
                data-layername={song.name}
                className="text-2xl font-bold mb-2"
              >
                {song.name}
              </div>
              {/* Artist Name */}
              <div
                data-layername={song.artists[0].name}
                className="text-base text-right hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/artist/${song.artists[0].id}`, { state: song.artists[0].name })
                }}
              >
                {song.artists[0].name}
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Featured;
