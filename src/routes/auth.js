require("dotenv").config()
const router = require('express').Router();
const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {User} = require('../models/User.js')
const session = require('express-session');
router.use(session({
    secret: 'a_Secret',
    resave: false,
    saveUninitialized: true,
    cookie: { domain:'https://la-ruina-api.fly.dev'},
}));
router.use(passport.initialize());
router.use(passport.session());
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: '874900879874-6fa06c807bf57v30mp7o376a5rs9tmg5.apps.googleusercontent.com',
//             clientSecret: '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',
//             callbackURL: `https://la-ruina-api.fly.dev/auth/google/callback`,
//             scope: ["profile", "email"]
//         },
//         async function (accessToken, refreshToken, profile, callback) {
//             callback(null, profile);
            
//         }
//     )
// );



// passport.deserializeUser((user, done) => {
//     done(null, user)
// });

// router.get("/login/success", (req, res) => {
//     console.log(req)
//     if (req.user) {
//         res.status(200).json({
//             message: "Successfully Loged In",
//             user: req.user,
//         })
//     } else {
//         res.status(403).json({
//             error: true,
//             message: "Not Authorized"
//         })
//     }
// })

// router.get("/login/failed", (req, res) => {
//     console.log(req)
//     res.status(401).json({
//         error: true,
//         message: "Log in failure"
//     })
// })

router.get("/google/callback",
  passport.authenticate('google', {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
      session: true,
  }),
  (req, res) => {
    passport.serializeUser((user, done) => {
        done(null, JSON.parse(JSON.stringify(user)));
    });
    req.session.isLoggedIn = true;
    return res.redirect("http://localhost:3000/something");
  }
);

passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: '874900879874-6fa06c807bf57v30mp7o376a5rs9tmg5.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: `https://la-ruina-api.fly.dev/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, done) {
        //const response = emails.includes(profile.emails[0].value);
        // IF EXITS IN DATABASE
        const response = await User.findOne({ where: { email: profile.emails[0].value } });
        if (response) {
            console.log('already exists')
          done(null, profile);
        } else {
          // SAVE IN DATABASE
         await User.create({
            alias: profile.displayName,
            email: profile.emails[0].value,
            isVerified: false,
            role: 'free',
            method: 'google',
            googleId: profile.id,
            token: profile.accessToken
          });
          console.log('created')
          done(null, profile);
          
        }
      }
    )
  );



router.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));


/* router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.AUTH_CLIENT_URL)
})
 */
// router.get("/getuser", (req, res) => {
//     //const user = req.session
//     var cookie = req.cookies.user || ' no cookie! something is wrong!'
//     console.log(req.cookies)
//     console.log('the cookie', req.cookies.user)
//     return res.json(cookie)
// })

router.get("/getuser", (req, res) => {
    passport.deserializeUser((user, done) => {
            done(null, user)
    });
    if(req.session.user){
        return res.json(req.session.user)
    }else
    if(req.user){
        return res.json(req.user)
    }else {
        return res.status(401).json({
            error: true,
            message: "Not Authorized"
        })
    }
});

module.exports = router;