import { Router } from "express";
import {
	createReview,
	deleteReview,
	getReviews,
	getSongRatings,
	getSongReviews,
	getUserReviews,
} from "../controllers/review.controller";

const router = Router();

router.post("/create", createReview);
router.get("/delete", deleteReview);
router.get("/getAll", getReviews);
router.get("/getUsers", getUserReviews);
router.get("/rating", getSongRatings);
router.get("/getSong", getSongReviews);

export default router;
