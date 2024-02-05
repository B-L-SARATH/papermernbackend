const express = require("express");
const db = require("./db/db");
const cors = require("cors");
const app = express();

app.use(express.json());
db();

app.use(cors());
app.get("/", (req, res) => {
  res.send("hellowrold");
});

//paper routes importing

app.use("/api", require("./routes/Paper"));

//user routes importing
app.use("/api", require("./routes/User"));

app.use("/api", require("./routes/Auth"));
app.post("/createuser", async (req, res) => {
  let data = req.body;
  try {
    const userdata = await usermodel.findOne({ email: req.body.email });
    if (userdata) {
      res.send("user already existed ");
    }

    await usermodel.create(data);
    console.log("user created successfully");
    console.log(data);
    res.send("user created successfully");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
