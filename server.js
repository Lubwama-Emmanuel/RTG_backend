const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`----server tappin on port:${port}`);
});
