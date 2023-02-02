const express = require("express");
const router = express.Router();
const { createUser, loginUser, verifyEmail, loginUserWithGoogle } = require("../controllers/users.js");


router.post("/signup", async (req, res) => {
  try {
    const response = await createUser(req, res);
    return res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
//♪ ♪ ♪ ♪ ♪ ♪ ♪ ♪ ♫ ♫ ♫ ♫ ♫ ♫ ♫ ♫
router.post("/login", async (req, res) => {
  try {
    const response = await loginUser(req, res)
    res.json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error }); 
  }
});

router.post("/loginwithgoogle", async (req, res) => {
  try {
    const response = await loginUserWithGoogle(req, res)
    res.json({ msg: response });
  } catch (error) {
    res.status(400).json({ error: error }); 
  }
});

router.get('/verify-email/:token', (req, res) => {
  const token = req.params.token;
  // const url = 'https://la-ruina-tv-client.vercel.app'
  const url = 'https://tv.laruinarecords.cl'
  try {
    const response = verifyEmail(token)
    if(response){
      return res.status(200).redirect(`${url}/mercadopago/plan/verify?message=verified`);
    }
  } catch (error) {
    console.log(error)
    return res.status(400).redirect(`${url}/mercadopago/plan/verify?message=notverified`);
  }
});

router.delete("/delete-account/:id", (req, res) => {

  const id = req.params.id;
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({
    where: {
        id: id,
        email: email,
        password: password
    }
  })
  .then(account => {
    if (!account) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    account
    .destroy()
      .then(() => res.json({ msg: "Cuenta eliminada con éxito" }))
      .catch(() => res.status(500).json({ msg: "Error del Servidor" }));
  })
});

exports.default = router
















/* ------------------Playlists---------------- */
router.post('/playlists/create', (req,res) =>{
  const {plalistName} = req.body
  console.log(req.body)
  res.status(200)
})

router.post('/playlists/add', (req,res) =>{
  const {playlistId, itemId, playlistName} = req.body
  console.log(req.body)
  res.status(200)
})

module.exports = router