import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Album = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [album, setAlbum] = useState<any>({});
  const location = useLocation();
  const albumID = location.pathname.slice(7);
  const albumName = location.state;

  const fetchAlbum = useCallback(async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/spotify/album",
      {
        params: { id: albumID },
      },
    );

    setAlbum(data);
    setIsLoading(false);
  }, [albumID]);

  useEffect(() => {
    fetchAlbum();
  }, [albumID, fetchAlbum]);

  return <div className="">{albumName}</div>;
};

export default Album;
