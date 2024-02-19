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

// app.get('/users/:id', async (req, res) => {
//     const id = req.params['id'];
//     const result = await userServices.findUserById(id);
//     if (result === undefined || result === null)
//         res.status(404).send('Resource not found.');
//     else {
//         res.send({users_list: result});
//     }
// });

// 

app.post('/users', async (req, res) => {
    const user = req.body;
    // if ((findUserByUsername(user.username)).length >= 1) {
    //     return res.status(400).send('Username is already taken. Please choose a different one.');
    // }
    const savedUser = await userServices.addUser(user);
    
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});







//     app.delete("/users/:id", (req, res) => {
//     const id = req.params["id"];
//     if (deleteUserById(id)) res.status(204).end();
//     else res.status(404).send("Resource not found.");
//   });

//   function deleteUserById(id) {
//     const userToDel = users["users_list"].find((user) => user["id"] === id);
//     const index = userToDel ? users["users_list"].indexOf(userToDel) : undefined;
//     if (index) {
//       users["users_list"].splice(index, 1);
//       return true;
//     }
//     return false;
//   }

// app.delete('/users/:username', async (req, res) => {
//     const user = req.body;
//     const savedUser = await userServices.delUser(user);
//     if (savedUser)
//         res.status(201).send(savedUser);
//     else
//         res.status(500).end();
// } )






//   app.delete('/users/:id', async (req, res) => {
    
//     const id = req.params['id'];
//     let result = await userServices.findUserById(id);
//     console.log("delete result:", result);
//     if (result === undefined){
//         res.status(404).send('Resource not found.');
//     }
//     else {
//         // const userToDelete = req.body;
//         // let index = usernameUser(result.id);
//         let result = await userServices.delUser(id);
//         if (result === undefined){
//             res.status(404).send('Delete failed.');
//         }
//         // users['users_list'].splice(index, 1);
//         res.status(204).end();

//     }
// })




app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];
    if (await userServices.deleteUserById(id)) res.status(204).end();
    else res.status(404).send("Resource not found.");
  });
  
  