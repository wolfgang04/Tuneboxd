import express from "express";
import cors from "cors";
import session from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import userRoutes from "./routes/user.routes";
import spotifyRoutes from "./routes/spotify.routes";
import albumRoutes from "./routes/album.routes";
import artistRoutes from "./routes/artist.routes";
import songRoutes from "./routes/song.routes";
import reviewRoutes from "./routes/review.routes";
import playlistRoutes from "./routes/playlist.routes";

const app: express.Application = express();

const redisClient = new Redis();

redisClient.on("connect", () => {
	console.log("Connected to redis");
});

redisClient.on("ready", () => {
	console.log("Redis connection ready");
});

redisClient.on("error", () => {
	console.error("Redis connection error");
});

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

app.use(
	session({
		name: "qid",
		store: new RedisStore({ client: redisClient, disableTouch: true }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		},
		saveUninitialized: false,
		secret: process.env.SECRET || "SECRET",
		resave: false,
	})
);

app.use("/api/user", userRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/song", songRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/review", reviewRoutes);
app.use("api/playlist", playlistRoutes);

export default app;
