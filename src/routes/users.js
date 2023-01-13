const express = require("express");
const router = express.Router();

const { createUser, loginUser, verifyEmail } = require("../controllers/users.js");

router.post("/signup", async (req, res) => {
  try {
    const response = await createUser(req, res);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await loginUser(req, res);
    return res.status(200).json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/verify-email/:token', (req, res) => {
  const token = req.params.token;
  try {
    const response = verifyEmail(token)
    if(response){
      return res.status(200).redirect(`http://localhost:3000/verify?message=verified`);
    }
  } catch (error) {
    console.log(error)
    return res.status(400).redirect('http://localhost:3000/verify?message=notverified');
  }
});

module.exports = router