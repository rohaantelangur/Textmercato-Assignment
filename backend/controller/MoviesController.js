const asyncHandler = require("express-async-handler");
const movies = require("../models/movies");

const MoviesController = asyncHandler(async (req, res) => {
  try {
    const page = Math.abs(req.query.page) || 1;
    const limit = Math.abs(req.query.limit) || 10;
    const label = req.query.label || "";
    const order = req.query.order;
    const skip = limit * (page - 1);
    const shortlisted = (req.query.shortlisted=='true'?true:false);
    const visible = (req.query.visible=='true'?true:false);
    console.log(page,limit,label,order,skip,shortlisted,visible);
    const obj = movies.aggregate([
      {
        $match:{
          $and: [ { isShortlisted: shortlisted?"TRUE":"FALSE" }, { isVisible: visible?"TRUE":"FALSE"  } ]
        }
      },
      {
        $sort: { title: order == "asc" ? 1 : -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    if (label!=="") {
      obj._pipeline.unshift({
        $match: {
          label: { $regex: label, $options: "i" },
        },
      });
    }

    const result = await obj;

    res.json({
      success: true,
      length: result.length,
      data: result,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = { MoviesController };
