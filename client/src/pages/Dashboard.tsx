import React, { useEffect, useState } from 'react';
import MainContent from '../components/Dashboard/MainContent';
import TrendingSongHits from '../components/Dashboard/TrendingSongHits';
import Recommended from '../components/Dashboard/Recommended';
import CommunityTalks from '../components/Dashboard/CommunityTalks';
import axios from 'axios';
import server from '../SERVER';

interface TrendingSong {
  rank: string;
  title: string;
  artist: string;
  imageUrl: string;
  artistId: string;
  songId: string;
  song: string;
}

const TuneboxdDashboard: React.FC = () => {
  const [trendingSongs, setTrendingSongs] = React.useState<TrendingSong[]>([]);
  const [recommendedSongs, setRecommendedSongs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrendingSongs()
    fetchTopSongs();
  }, []);

  const fetchTrendingSongs = async () => {
    try {
      const { data } = await axios.get(`${server}lastfm/topSongs`);
      const songs = data.song.tracks.track.slice(0, 6);
      const songNames = songs.map((song: any) => song.name);

      const { data: topData } = await axios.get(`${server}spotify/featuredSongs`, { params: { featured: songNames } });
      setTrendingSongs(topData.tracks.map((track: any, index: number) => {
        return {
          rank: `${index + 1}`.padStart(2, '0'),
          title: track.name,
          artist: track.artists[0].name,
          imageUrl: track.album.images[0].url,
          artistId: track.artists[0].id,
          songId: track.id,
          song: track.name
        }
      }));

    } catch (error) {
      console.error("Error fetching trending songs: ", error);
    }
  }

  const fetchTopSongs = async () => {
    try {
      const { data } = await axios.get(`${server}lastfm/topSongs`);
      if (data.song && data.song.tracks && Array.isArray(data.song.tracks.track)) {
        const songs = data.song.tracks.track.slice(10, 16);
        const songNames = songs.map((song: any) => song.name);
        setRecommendedSongs(songNames);
      } else {
        console.error("Unexpected data structure:", data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div data-layername="dashboard" className="flex overflow-hidden flex-col px-16 pb-16 bg-white max-md:px-5">
      <MainContent />
      <TrendingSongHits trendingSongs={trendingSongs} />
      {!isLoading && recommendedSongs.length > 0 && (
        <Recommended rec={recommendedSongs} />
      )}
      <CommunityTalks />
    </div>
  );
};

export default TuneboxdDashboard;