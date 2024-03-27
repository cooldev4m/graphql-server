import Mongoose from "mongoose";
import config from "../config/db.js";

Mongoose.connect(config.mongodb, {
  connectTimeoutMS: 1000 * 5,
})
  .then((mongoose) => {
    console.log("Successfully connected.");
  })
  .catch((error) => {
    console.error("Error occured while connecting database.", error.toString());
  });
