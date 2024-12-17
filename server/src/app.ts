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
import followRoutes from "./routes/follow.routes";
import lastfmRoutes from "./routes/lastfm.routes";

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

// Allow production URL and any Vercel preview URLs
const allowedOrigins = [
	'https://tuneboxd-client.vercel.app', // Replace with your final production domain
	/\.vercel\.app$/,                     // Matches any *.vercel.app URL
];

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.some((allowed) => typeof allowed === 'string' ? allowed === origin : allowed.test(origin))) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true, // Allow credentials if necessary
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(
	session({
		name: "qid",
		store: new RedisStore({ client: redisClient, disableTouch: true }),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
			secure: true,
			sameSite: "lax",
		},
		saveUninitialized: false,
		secret: process.env.SECRET || "SECRET",
		resave: false,
	})
);

app.use("/api/user", userRoutes);
app.use("/api/spotify", spotifyRoutes);
app.use("/api/lastfm", lastfmRoutes);
app.use("/api/song", songRoutes);
app.use("/api/artist", artistRoutes);
app.use("/api/album", albumRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/playlist", playlistRoutes);
app.use("/api/follow", followRoutes);

export default app;
