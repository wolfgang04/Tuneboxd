import { Router } from "express";
import { search } from "../controllers/spotify.controller";

const router = Router();

router.get("/search", search);

export default router;
