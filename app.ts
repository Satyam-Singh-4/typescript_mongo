import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./Router/router";
const PORT = 4049;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//router
app.use("/", router);

//Server initialization

app.listen(PORT, (): void => {
  console.log(`server is running on port ${PORT}`);
});
