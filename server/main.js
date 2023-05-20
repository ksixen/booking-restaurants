const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const port = 3030;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/reg", (req, res) => {
  const { username, password } = req.body;
  const value = fs.readFileSync("./users.json", { encoding: "utf-8" });
  const object = JSON.parse(value && value !== "" ? value : "{}");
  if (!username || !password) {
    res.status(403).send({
      response: "Invalid args",
    });
  } else if (username in object) {
    res.status(403).send({
      response: "This username already in use",
    });
  } else {
    object[username] = password;
    fs.writeFileSync("./users.json", JSON.stringify(object));
    res.status(200).send({
      response: true,
    });
  }

});
app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post("/log", (req, res) => {
  const { username, password } = req.body;

  const value = fs.readFileSync("./users.json", { encoding: "utf-8" });
  const object = JSON.parse(value && value !== "" ? value : "{}");
  if (!username || !password) {
    res.status(403).send({
      response: false,
    });
  } else {
    const isOk = username in object && object[username] === password;
    console.log(object[username] === password);
    res.status(isOk ? 200 : 403).send({
      response: isOk,
    });
  }
});
app.post("/order", (req, res) => {
  const { username, guests, day, time } = req.body;
  if (!time || !guests || !day || !username) {
    res.status(400).send({
      response: false,
    });
  }
  const value = fs.readFileSync("./orders.json", { encoding: "utf-8" });
  const object = JSON.parse(value && value !== "" ? value : "{}");
  if (!(day in object)) {
    object[day] = [];
  }

  object[day].push({
    time,
    guests,
    day,
    username,
  });

  fs.writeFileSync("./orders.json", JSON.stringify(object));
  res.status(200).send({
    response: true,
  });
});
app.post("/cancelOrder", (req, res) => {
  const { username, day, time } = req.body;
  if (!time || !day || !username) {
    res.status(400).send({
      response: false,
    });
  }
  const value = fs.readFileSync("./orders.json", { encoding: "utf-8" });
  const object = JSON.parse(value && value !== "" ? value : "{}");
  if (!(day in object)) {
    object[day] = [];
  }
  object[day] = object[day].filter(v => v.time !== time && username === username)
  fs.writeFileSync("./orders.json", JSON.stringify(object));
  res.status(200).send({
    response: true,
  });
});
app.post("/dayOrder", (req, res) => {
  const { day } = req.body;

  const value = fs.readFileSync("./orders.json", { encoding: "utf-8" });
  const object = JSON.parse(value && value !== "" ? value : "{}");
  if (!(day in object)) {
    object[day] = [];
    fs.writeFileSync("./orders.json", JSON.stringify(object));
  }

  res.status(200).send({
    response: object[day],
  });
});
app.post("/usersOrders", (req, res) => {
  const { username } = req.body;

  const value = fs.readFileSync("./orders.json", { encoding: "utf-8" });
  const object = JSON.parse(value && value !== "" ? value : "{}");
  const array = Object.values(object).flatMap((v) => v);

  res.status(200).send({
    response: array.filter((v) => v?.username === username),
  });
});
app.listen(port, () => {
  console.log("SERVER START ON http://localhost:3030/");
});
