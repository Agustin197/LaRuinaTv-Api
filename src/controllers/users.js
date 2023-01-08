const {User} = require("../models/User.js")
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  let { alias, email, password } = req.body;
  if (!alias) {
    throw new Error("El alias es requerido");
  } else if (!email) {
    throw new Error("el email es requerido");
  } else if (!password) {
    throw new Error("La contraseña es requerida");
  } else {
    const exists = await User.findOne({ where: { email: email } });
    if (exists) throw new Error("El email ya está en uso.");
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      alias: alias,
      email: email,
      password: hashPassword
    });

    
    return "usuario creado con exito!"
    
  } catch (error) {
    return error;
  }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findAll({
          where: {
            email: req.body.email,
          },
        });
    
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ error: "Wrong Password" });
    
        const userId = user[0].id;
        const userAlias = user[0].alias;
        const email = user[0].email;
    
        const payload = {
          userId, userAlias, email
        }
    
        return payload
      } catch (error) {
        return res.status(500).json({ error: error });
      }
}

module.exports = {createUser, loginUser}