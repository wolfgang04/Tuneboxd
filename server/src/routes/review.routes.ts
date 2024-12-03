import { Router } from "express";
import {
	createReview,
	deleteReview,
	getReviews,
	getSongRatings,
	getUserReviews,
} from "../controllers/review.controller";

const router = Router();

router.post("/create", createReview);
router.get("/delete", deleteReview);
router.get("/getAll", getReviews);
router.get("/getUsers", getUserReviews);
router.get("/rating", getSongRatings);

export default router;
