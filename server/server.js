const app = require("./app");
const connectDB = require("./database");

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Il server è in ascolto sulla porta ${process.env.PORT}`)
);
