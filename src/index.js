const server = require('./app');
const { sequelize } = require("./db.js");

async function main() {
    try {
      await sequelize.sync({force: true});
      console.log("succesfully connected");
      server.listen(3001);
      console.log("server listening on port 3001");
    } catch (error) {
      console.error("Unable to connect to database");
    }
}

  
main();