const express = require("express");
const server = express.Router();

const { createUser, loginUser } = require("../controllers/users.js");

/* -------------Account------------- */

server.post("/signup", async (req, res) => {
  try {
    const response = await createUser(req, res);
    return res.status(200).json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

server.post("/login", async (req, res) => {
  try {
    const response = await loginUser(req, res);
    return res.status(200).json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = server