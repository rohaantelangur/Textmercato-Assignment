const express = require("express");
const { MoviesController } = require("../controller/MoviesController");
const router = express.Router();

router.get('/movies', MoviesController)

module.exports = router