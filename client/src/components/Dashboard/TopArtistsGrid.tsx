import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ArtistItem {
  name: string;
  cover: string; // New prop for image URL
  id: string
}

const ArtistItem: React.FC<{name: string; cover: string}> = ({ name, cover }) => (
  <div className=" flex-col grow text-xl font-semibold  text-stone-900 max-md:mt-10">
    <div className=" shrink-0 rounded-full bg-stone-900 h-[150px] w-[150px] overflow-hidden justify-center ">
      <img
        src={cover}
        alt={name}
        className="w-full h-full object-cover"
      />
    </div>
    <div data-layername="artistName" className=" mt-6 text-center">
      {name}
    </div>
  </div>
);

const TopArtistsGrid: React.FC = () => {
  const [artists, setArtists] = useState<ArtistItem[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchArtists();
  }, [])

  const fetchArtists = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/artist/followed", { withCredentials: true });
      setArtists(response.data);
    } catch (error) {
      console.error("Error fetching top artists:", error);
    }
  }

  return (
    <div data-layername="column" className="flex flex-col ml-5 w-[45%] max-md:ml-0 max-md:w-full">
      <div className="self-stretch my-auto max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col items-center">
          {artists.length === 0 ? 
            <p>Looks like you haven't followed any artists yet</p>
           : (
            artists.map((artist, index) => 
            <div key={index} data-layername="column" className="items-center flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
            onClick={() => navigate(`artist/${artist.id}`)}>
              <ArtistItem name={artist.name} cover={artist.cover} />
            </div>
            )
           )}
        </div>
      </div>
    </div>
  );
};

export default TopArtistsGrid;
