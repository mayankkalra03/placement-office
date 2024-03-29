import express from "express";
import {
  adminGetAllApplications,
  postApplication,
  studentDeleteApplication,
  studentGetAllApplications,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/admin/getall", isAuthenticated, adminGetAllApplications);
router.get("/student/getall", isAuthenticated, studentGetAllApplications);
router.delete("/delete/:id", isAuthenticated, studentDeleteApplication);

export default router;
