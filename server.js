const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3003;

const DB = process.env.MONGODB_URL.replace(
  "<PASSWORD>",
  process.env.MONGODB_PASSWORD
);

// CONNECT TO DATABASE
mongoose
  .connect(DB)
  .then(() => console.log(`---DATABASE CONNECTED SUCCESSFULLY`))
  .catch((error) =>
    console.log(`Ooooooops DATABASE NOT CONNECTED ERROR: ${error}`)
  );

app.listen(port, () => {
  console.log(`----server tappin on port:${port}`);
});
