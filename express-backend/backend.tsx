const express = require("express");
const cors = require("cors");
const userServices = require("./models/user-services.tsx");
const itemServices = require("./models/item-services.tsx");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const username = req.query["username"];
  const password = req.query["password"];
  try {
    const result = await userServices.getUsers(username, password);
    if (result.length == 0) {
      return res.status(404).send("User not found");
    }
    return res.send({ users_list: result });
  } catch (error) {
    return res.status(500).send("An error occurred in the server.");
  }
});

app.get("/users/:username", async (req, res) => {
  const id = req.params["id"];
  const result = await userServices.findUserById(id);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({ users_list: result });
  }
});


app.post('/users/', async (req, res) => {
    const user1 = req.body['username'];
    const user = req.body;
    
    const user2 = await userServices.findUserByUsername(user1);
    // console.log("user2: ", user2);
    if (user2.length > 0)
        res.status(409).send("username already taken");
    else {
        const savedUser = await userServices.addUser(user);
        if (savedUser.error){
            res.status(409).send(savedUser.message);    //password length must be 5... I think
        }
        else{
            res.status(201).send(savedUser);
        }    
    }
});

app.post("/items/", async (req, res) => {
  const item = req.body;

    const savedItem = await itemServices.addItem(item);
    if (savedItem) res.status(201).send(savedItem);
    else res.status(409).end();
  }
);

app.patch("/itemToUser/", async (req, res) => {
  const uid = req.query["uid"]
  //const id = req.query["id"];
  const item = req.body;
  const savedItem = await itemServices.addItem(item);
  const id = savedItem._id;
  console.log(id)
  const user = await userServices.addItemToUser(uid, id);
  if (user) {
    res.status(201).send(user);
  }
  else res.status(409).end();
});

app.patch("/items/", async (req, res) => {
  const uid = req.query["uid"];
  const id = req.query["id"];
  const option = req.query["option"];
  const quantity = req.query["quantity"];
  console.log(option)
  if (option === "add" || option === "sub") {
    const result = await userServices.updateItemFromUser(uid, id, quantity, option);
    res.status(201).send("worked");
  } else {
    res.status(404).send("wrong option")
  }
});

app.get("/items/", async (req, res) => {
  let result = null;
  const uid = req.query["uid"];
  const id = req.query["id"];
  if (!id && !uid) {
    result = await itemServices.getItems(uid, id);
  } else {
    result = await userServices.getItemFromUser(uid, id);
  } 
  if (result) {
    res.status(201).send(result);
  } else {
    res.status(404).send("item not found");
  }
});

app.delete("/items/", async (req, res) => {
  const uid = req.query["uid"];
  const id = req.query["id"];
  const result = await userServices.deleteItemFromUser(uid, id);
  const result2 = await itemServices.deleteItem(id);
  res.status(201).send("item deleted");
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  if (await userServices.deleteUserById(id)) res.status(204).end();
  else res.status(404).send("Resource not found.");
});
