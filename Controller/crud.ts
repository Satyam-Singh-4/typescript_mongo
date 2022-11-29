import express, { Request, Response } from "express";
import { db } from "../db";
const table = db.collection("data");

const add = async (req: Request, res: Response) => {
  try {
    console.log("body:", req.body);
    let resp;
    if (req.body && Array.isArray(req.body)) {
      resp = await table.insertMany(req.body);
    } else if (req.body) {
      resp = await table.insertOne(req.body);
    }
    res.json({
      response: resp,
      message: "Home_page",
    });
  } catch (error) {}
};

//find records

const find = async (req: Request, res: Response) => {
  console.log("body:", req.body);
  req.body = req.body ? req.body : {};
  try {
    let resp;
    resp = await table.find(req.body).toArray();

    console.log("response:", resp);
    res.status(200).json({
      response: resp,
      message: "fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "unable to fetch",
    });
  }
};

//update record

const update = async (req: Request, res: Response) => {
  console.log("Body:", req.body);
  try {
    let records = await table.find(req.body.where).toArray();

    console.log(records);
    for (const record of records) {
      console.log(record);
      let resp1 = await table.findOneAndUpdate(
        { role: record.role },
        { $set: req.body.data }
      );
    }
    res.status(200).json({
      response: "successfully updated",
    });
  } catch (error) {
    res.status(400).json({
      error: error,
    });
    console.log(error);
  }
};

const remove = async (req: Request, res: Response) => {
  console.log("Body:", req.body);
  req.body.where = req.body.where ? req.body.where : {};

  try {
    await table.deleteMany(req.body.where);
    res.status(200).json({
      response: "deleted successfully",
    });
  } catch (error) {}
};

export { add, find, update, remove };