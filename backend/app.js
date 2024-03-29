import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import quesRouter from "./routes/quesRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/user", userRouter);
app.use("/job", jobRouter);
app.use("/application", applicationRouter);
app.use("/interview", quesRouter);

app.get('/download-image', async (req, res) => {
  const imageUrl = req.query.url; // Get the image URL from query params
  try {
    const response = await axios({
      url: imageUrl,
      method: 'GET',
      responseType: 'stream',
    });
    res.setHeader('Content-Disposition', `attachment; filename="${decodeURIComponent(imageUrl.split('/').pop())}"`);
    response.data.pipe(res);
  } catch (error) {
    res.status(500).send("Error downloading the image");
  }
});



dbConnection();

app.use(errorMiddleware);
export default app;
