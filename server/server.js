const app = require("./app");
const connectDB = require("./database");
const PORT = /* process.env.PORT || */ 8080;
connectDB();

app.listen(PORT, () =>
  console.log(`The server is listening on the port: ${process.env.PORT}`)
);
