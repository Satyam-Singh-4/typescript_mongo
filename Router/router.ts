import express from "express";
const router = express.Router();
import * as crud from "../Controller/crud";
router.post("/test", crud.add);
router.get("/fetch", crud.find);
router.put("/set", crud.update);
router.delete("/remove", crud.remove);

export { router };
