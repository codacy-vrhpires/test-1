const AWS = require("aws-sdk");
const db = require("../config/mysql");
const PowerBiGenerate = require("../models/powerBiGenerate");
const PowerBiLog = require("../models/powerBiLog");
const PowerBiPreferences = require("../models/powerBiPreferences");
const moment = require("moment");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const BUCKET_NAME = process.env.POWERBI_BUCKET_NAME;

exports.powerBiDmHelper = async (req, res) => {
  try {
    const { clientId, appId } = req.query;

    const foundDM = await PowerBiGenerate.findOne({
      app_id: appId,
      is_active: true,
      is_deleted: false,
      status: "ACTIVE",
    });

    if (!foundDM) {
      res.status(500).send("Invalid key");
      return;
    }

    const user = await db.authuser.find({
      where: { authuser_id: foundDM.user_id, is_deleted: 0, is_access: 0 },
    });
    if (!user) {
      res.status(500).send("Unauthorized");
      return;
    }

    if (foundDM.client_id != clientId) {
      res.status(500).send("No client found");
      return;
    }

    // update find to check data user allowed and if met
    const today = moment().format("YYYY-MM-DD");
    const dataFetchedToday = await PowerBiLog.find({
      app_id: appId,
      user_id: foundDM.user_id,
      called_at: { $gte: today },
    });
    const powerBiPref = await PowerBiPreferences.findOne({
      client_id: clientId,
    });

    if (dataFetchedToday.length > powerBiPref.preferences.hit_rate) {
      res.status(500).send("You have reached today's API limit");
      return;
    }

    const dmId = foundDM.datamodel_id;
    const params = {
      Bucket: BUCKET_NAME,
      Key: `documents/powerBi/${clientId}/${foundDM.user_id}/${dmId}.json`,
    };

    // WITHOUT STREAM
    // s3.getObject(params, function (err, data) {
    //   if (err) {
    //     res.status(500).json({
    //       code: false,
    //       message: 'No Access',
    //     });
    //   } else {
    //     res.send(data.Body.toString('utf-8'));
    //   }
    // });

    // WITH STREAM
    s3.getObject(params)
      .on("httpHeaders", function (statusCode, headers) {
        console.log("%%%%", statusCode, headers);
        res.set("Content-Length", headers["content-length"]);
        res.set("Content-Type", headers["content-type"]);
        this.response.httpResponse.createUnbufferedStream().pipe(res);
      })
      .on("error", (error) => {
        console.log("$$$$", error);
      })
      .send();

    await PowerBiLog.create({
      app_id: foundDM.app_id,
      client_id: foundDM.client_id,
      datamodel_id: foundDM.datamodel_id,
      user_id: foundDM.user_id,
    });
  } catch (err) {
    console.log("Power Bi contract helper error", err);
    res.status(500).send("No datamodel file found");
  }
};
