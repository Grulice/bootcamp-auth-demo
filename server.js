const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

let credits = [
  { id: 1, name: "Jane", purpose: "New cat", sum: "500", date: "2020-02-01" },
];
let users = [
  { login: 'alex', pass: '123456' },
  { login: 'creditCreator', pass: 'superSecretPassword' }
];

nextId = 2;

function checkCredentials(req) {
  const userLogin = req.body.login;
  const userPass = req.body.pass;
  console.log(users);
  const user = users.find(u => u.login === userLogin);
  if (!user) {
    return false;
  }
  if (user.pass === userPass) {
    return true;
  } else {
    return false;
  }
}

app.post('/register', (req, res) => {
  const user = {
    login: req.body.login,
    pass: req.body.pass
  };
  // Check that user not exists
  users.push(user);
  res.json(user);
});

app.get('/credits', (req, res) => {
  res.json(credits);
});

app.get('/credits/:id', (req, res) => {
  res.json(credits.find(el => el.id === req.params.id));
});

app.delete('/credits/:id', (req, res) => {
  if (!checkCredentials(req)) {
    res.sendStatus(401);
  } else {
    const id = +req.params.id;
    const toDelete = credits.find(el => el.id === id);
    if (!toDelete) {
      res.sendStatus(404);
    } else {
      credits = credits.filter(el => el !== toDelete);
      res.send(toDelete);
    }
    res.json();
  }
});

app.post('/credits', (req, res) => {
  if (!checkCredentials(req)) {
    res.sendStatus(401);
  } else {
    let credit = {
      id: nextId++,
      name: req.body.name,
      purpose: req.body.purpose,
      sum: +req.body.sum,
      date: req.body.date
    }
    console.log(credit);
    credits.push(credit);
    res.status(201).json(credit);
  }
});


app.listen(port, () => { console.log('Started server at port ' + port); });
