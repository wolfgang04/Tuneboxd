import axios from "axios";
import { request, Request, Response } from "express";
import { LASTFM_API_KEY } from "../../constants";
import { baseUrl } from "./lastfm.controller";

export const getAlbumInfo = async (request: Request, response: Response): Promise<any> => {
  const { album } = request.query;

  try {
    const albumRes = await axios.get(`${baseUrl}?method=album.getInfo&album=${album}&api_key=${LASTFM_API_KEY}&format=json`);

    return response.status(200).send({
      album: albumRes.data
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in getAlbumInfo: ", error.message);
      return response.status(500).send({ message: error.message });
    } else {
      console.error("Error in getAlbumInfo: ", error);
      return response.status(500).send({ message: "Internal server error" });
    }
  }
}