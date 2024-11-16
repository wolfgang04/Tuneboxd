import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Track = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [track, setTrack] = useState<any>({});
  const location = useLocation();
  const trackID = location.pathname.slice(7);
  const trackName = location.state;

  const fetchTrack = useCallback(async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/spotify/track",
      {
        params: { id: trackID },
      },
    );

    setTrack(data);
    setIsLoading(false);
    console.log(data);
  }, [trackID]);

  useEffect(() => {
    fetchTrack();
  }, [trackID, fetchTrack]);

  return <div className="">{trackName}</div>;
};

export default Track;
