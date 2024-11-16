import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";

const Artist = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [artist, setArtist] = useState<any>({});
  const location = useLocation();
  const artistID = location.pathname.slice(8);
  const artistName = location.state.artist;

  const fetchArtist = useCallback(async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/spotify/artist",
      {
        params: { artist: artistName, id: artistID },
      },
    );

    setArtist(data);
    setIsLoading(false);
    console.log(data);
  }, [artistID, artistName]);

  useEffect(() => {
    fetchArtist();
  }, [artistID, fetchArtist]);

  return <div className="">{artistName}</div>;
};

export default Artist;
