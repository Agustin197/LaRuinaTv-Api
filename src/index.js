require('dotenv').config

const { port } = process.env
const server = require('./app');
const sequelize = require("./db.js");


// async function main() {
//     try {
//       await sequelize.sync({force: true});
//       console.log("succesfully connected");
//       server.listen(3001);
//       console.log(`server listening on port ${port? port:3001}`);
//     } catch (error) {
//       console.error("Unable to connect to database");
//     }
// }

// main();

server.listen(port, ()=> console.log(`server listening on port ${port? port:3001}`))//MODO PRUEBAS