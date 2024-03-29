import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "Placement_Office",
    })
    .then(() => {
      console.log("Connected to MongoDB.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
