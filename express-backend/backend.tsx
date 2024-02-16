const express = require( 'express');
const cors = require( 'cors');
const userServices = require( './models/user-services.tsx');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
    users_list: [
      {
        username: "Charlie",
        password: "Janitor",
      },
      {
        username: "Mac",
        password: "Bouncer",
      },
      {
        username: "Mac",
        password: "Professor",
      },
      {
        username: "Dee",
        password: "Aspring actress",
      },
      {
        username: "Dennis",
        password: "Bartender",
      },
    ],
  };



app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
app.get('/users', async (req, res) => {
    const username = req.query['username'];
    const password = req.query['password'];
    try {
        const result = await userServices.getUsers(username, password);
        res.send({users_list: result});         
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred in the server.');
    }
});


app.get('/users/:username', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});


app.delete('/delete/:username', async (req, res) => {
    const user = req.params['username'];
    const savedUser = await userServices.delUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
} )

app.post('/users/', async (req, res) => {
    const user1 = req.body['username'];
    const user = req.body;
    
    const savedUser = await userServices.addUser(user);
    
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
    const user2 = await userServices.findUserByUsername(user1);
    if (user2.length > 0)
        res.status(500).send("username already taken");
    else {
        const savedUser = await userServices.addUser(user);
        if (savedUser)
            res.status(201).send(savedUser);
        else
            res.status(500).end();
    }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];
    if (await userServices.deleteUserById(id)) res.status(204).end();
    else res.status(404).send("Resource not found.");
  });
  
  