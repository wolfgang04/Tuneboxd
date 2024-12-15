import axios from "axios";
import { request, Request, Response } from "express";
import { LASTFM_API_KEY } from "../../constants";
import { baseUrl } from "./lastfm.controller";

export const getSongInfo = async (request: Request, response: Response): Promise<any> => {
  const { song, artist } = request.query;

  try {
    const songRes = await axios.get(`${baseUrl}?method=track.getInfo&api_key=${LASTFM_API_KEY}&artist=${artist}&track=${song}&format=json`);

    return response.status(200).send({
      song: songRes.data
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getSongInfo: ", error.message);
      return response.status(500).send({ message: error.message });
    } else {
      console.error("Error in getSongInfo: ", error);
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}

export const getSimilarSongs = async (request: Request, response: Response): Promise<any> => {
  const { song, artist } = request.query;

  try {
    const songRes = await axios.get(`${baseUrl}?method=track.getSimilar&api_key=${LASTFM_API_KEY}&artist=${artist}&track=${song}&format=json`);

    return response.status(200).send({
      song: songRes.data
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getSimilarSongs: ", error.message);
      return response.status(500).send({ message: error.message });
    } else {
      console.error("Error in getSimilarSongs: ", error);
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}

export const getTopSongs = async (request: Request, response: Response): Promise<any> => {
  try {
    const songRes = await axios.get(`${baseUrl}?method=chart.getTopTracks&api_key=${LASTFM_API_KEY}&format=json`);

    return response.status(200).send({
      song: songRes.data
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getTopSongs: ", error.message);
      return response.status(500).send({ message: error.message });
    } else {
      console.error("Error in getTopSongs: ", error);
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}