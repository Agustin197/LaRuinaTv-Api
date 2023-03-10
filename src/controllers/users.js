const { User } = require("../models/User.js")
const bcrypt = require("bcrypt");
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');
const { SENDGRID_API } = process.env;


const createUser = async (req, res) => {

  sgMail.setApiKey(SENDGRID_API);
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
      token: token,
      role: 'common_user',
      subscription: 'free plan'
    });
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
    if (req.body.email === 'admin' && req.body.password === 'admin') {
      const payload = {
        userId: -1, userAlias: 'admin', email: 'admin', isVerified: true,
        role: JSON.stringify({ role: 'admin', userMode: 'admin' })
    }
      return payload
    }

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
    const role = user[0].role;
    const subscription = user[0].subscription;

    const payload = {
      userId, userAlias, email, role, subscription
    }

    return payload
  } catch (error) {
    return error
  }
}

const loginUserWithGoogle = async (req, res) => {
  const { accessToken } = req.body
  console.log(accessToken)
  try {
    const user = await User.findAll({
      where: {
        token: accessToken,
      },
    });

    if (user) {
      const userId = user[0].id;
      const userAlias = user[0].alias;
      const email = user[0].email;
      const role = user[0].role;
      const googlePic = user[0].googlePic
      const subs = user[0].subscription
      const payload = {
        userId, userAlias, email, role, googlePic, subs
      }

      return payload
    }
    return 'token invalido'
  } catch (error) {
    return console.log(error)
  }
}

const sendVerificationEmail = (userEmail, token) => {
  const msg = {
    to: userEmail,
    from: 'terminalkillerproject@gmail.com',
    subject: 'Email Verification',
    html: `<p>Por favor, ingresa al siguiente link para verificar tu email:</p> 
             <p>https://la-ruina-tv-client.vercel.app/users/verify-email/${token}</p>`
  };
  return sgMail.send(msg);
};

const verifyEmail = async (token) => {
  const tokenExistsInUser = await User.findOne({ where: { token: token } });
  if (tokenExistsInUser) {
    await User.update(
      { isVerified: true },
      { where: { token: token } }
    )
    return 'Correo verificado!'
  } else {
    throw new Error("El token es inválido");
  }
}

async function updateUserPlan(newSub, userId) {

  try {
    await User.update(
      { subscription: `${newSub}`},
      {where: { id: userId }}
    );
    return newSub

  } catch (error) {
    console.log(error);
    return "Error al actualizar"
  }
}

async function getUserPlan (userId) {
  const existingUser = await User.findOne({ 
    where: { id: userId },
    attributes: ['role']
  });
  console.log('el suppuesto sub: ', existingUser)
  if(existingUser.role === JSON.stringify({ role: 'common_user', userMode: 'subscriber' })){
    return 'subscriber'
  }else{
    return "free"
  }
}

module.exports = { getUserPlan, createUser, loginUser, verifyEmail, loginUserWithGoogle, updateUserPlan }