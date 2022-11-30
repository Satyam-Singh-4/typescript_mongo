import { Request, Response } from "express";

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
      message: "successfully inserted",
    });
  } catch (error) {}
};

//find records

const find = async (req: Request, res: Response) => {
  console.log("body:", req.body);
  req.body = req.body ? req.body : " ";
  try {
    let resp;
    var count;

    //if Pagination params provided
    if ((req.body.skip || req.body.skip === 0) && req.body.take) {
      resp = await table
        .find(req.body.where)
        .limit(req.body.take)
        .skip(req.body.skip)
        .toArray();
      count = await table.countDocuments();

      console.log("Count:", count);
      console.log("if block");
    } else if ((req.body.page || req.body.page == 0) && req.body.size) {
      resp = await table
        .find({
          $or: [
            { role: { $regex: ".*" + req.body.role + ".*" } },

            { f_name: { $regex: ".*" + req.body.f_name + ".*" } },
            { l_name: { $regex: ".*" + req.body.l_name + ".*" } },
          ],
        })
        .limit(req.body.size)
        .skip(req.body.page)
        .toArray();
      count = await table.countDocuments();
      console.log("if block");
    }
    //if Pagination params  provided with find many
    else {
      resp = await table.find(req.body).toArray();
    }

    console.log("response:", resp);
    res.status(200).json({
      response: resp,
      message: "fetched successfully",
      count: count,
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
      console.log(record._id);
      let resp1 = await table.findOneAndUpdate(
        { _id: record._id },
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
    // table.deleteOne({ _id: new mongo.ObjectId(req.body.id) });
    res.status(200).json({
      response: "deleted successfully",
    });
  } catch (error) {}
};

//find many with pagination

const findMany = async (req: Request, res: Response) => {
  try {
    var resp;
    var count;
    if ((req.body.skip || req.body.skip == 0) && req.body.take) {
      resp = await table
        .find({
          $or: [
            { role: { $regex: ".*" + req.body.role + ".*" } },

            { f_name: { $regex: ".*" + req.body.f_name + ".*" } },
            { l_name: { $regex: ".*" + req.body.l_name + ".*" } },
          ],
        })
        .limit(req.body.take)
        .skip(req.body.skip)
        .toArray();
      count = await table.countDocuments();
      console.log("if block");
    } else {
      resp = await table
        .find({
          $or: [
            { role: { $regex: ".*" + req.body.role + ".*" } },

            { f_name: { $regex: ".*" + req.body.f_name + ".*" } },
            { l_name: { $regex: ".*" + req.body.l_name + ".*" } },
          ],
        })
        .toArray();
      count = await table.countDocuments();
    }
    res.json({
      response: resp,
      count: count,
    });
  } catch (error) {}
};
export { add, find, update, remove, findMany };
