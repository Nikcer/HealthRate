const app = require("./app");
const connectDB = require("./database");
const PORT = process.env.PORT || 8000;
connectDB();

app.listen(PORT, () =>
  console.log(`Il server è in ascolto sulla porta ${process.env.PORT}`)
);
