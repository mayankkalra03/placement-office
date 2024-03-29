import express from "express";
import {
  deleteQues,
  getAllQuestions,
  getSingleQues,
  postQues,
  updateQues,
} from "../controllers/quesController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getallques", getAllQuestions);
router.post("/postques", isAuthenticated, postQues);
router.put("/updateques/:id", isAuthenticated, updateQues);
router.delete("/deleteques/:id", isAuthenticated, deleteQues);
router.get("/:id", isAuthenticated, getSingleQues);

export default router;
