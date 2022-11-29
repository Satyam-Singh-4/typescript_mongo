import express, { Request, Response } from "express";
const router = express.Router();
import { add, find, remove, update } from "../Controller/crud";
router.post("/test", add);
router.get("/fetch", find);
router.put("/set", update);
router.delete("/remove", remove);

export { router };
