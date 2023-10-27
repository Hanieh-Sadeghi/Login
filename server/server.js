const express = require("express");
const app = express();
const PORT = 3000;

const users = [];
const bcrypt = require("bcrypt");
app.use(express.json());


app.get("/users", (req, res) => {
  res.json(users);
});


app.post("/users", async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password.salt);
    const user = { name: req.body.name, password: req.body.password };
    users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch {
    res.status(500).send();
  }
});


app.listen(3000, () => {
    console.log(`listening pn port ${PORT}`);
});
  