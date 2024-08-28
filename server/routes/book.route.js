const express = require("express");
const { getBook } = require("../Controller/book.controller"); // Adjust the path according to your folder structure

const router = express.Router();

router.get("/", getBook);

module.exports = router;
