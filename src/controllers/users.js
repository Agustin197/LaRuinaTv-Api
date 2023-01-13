const {User} = require("../models/User.js")
const bcrypt = require("bcrypt");
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');


const createUser = async (req, res) => {

  sgMail.setApiKey('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');
  const secret = 'asdjahsdjashduiasheiudncskmxsc';
  
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
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(email);
    const token = hmac.digest('hex');
    await User.create({
      alias: alias,
      email: email,
      password: hashPassword,
      isVerified: false,
      token: token
    });
    console.log(token);
    sendVerificationEmail(email, token).then(() => {
      console.log('Email sent')
      return "usuario creado con exito!"
    })
    .catch((error) => {
      console.error(error)
    })
    
    
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

const sendVerificationEmail = (userEmail, token) => {
  const msg = {
      to: userEmail,
      from: 'terminalkillerproject@gmail.com',
      subject: 'Email Verification',
      html: `<p>Por favor, ingresa al siguiente link para verificar tu email:</p> 
             <p>https://la-ruina-api.fly.dev/users/verify-email/${token}</p>`
  };
  return sgMail.send(msg)
};

const verifyEmail = async (token) => {
  const tokenExistsInUser = await User.findOne({ where: { token: token } });
  if (tokenExistsInUser){
    await User.update(
      { isVerified: true },
      { where: { token: token } }
    )
    return 'Correo verificado!'
  } else{
    throw new Error("El token es inválido");
  }
}

module.exports = {createUser, loginUser, verifyEmail}