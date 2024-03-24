"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const bodyParser = express_1.default.json();
app.use(bodyParser);
let users = [
    {
        name: 'Art',
        id: 1
    },
    {
        name: 'Max',
        id: 2
    },
    {
        name: 'Alex',
        id: 3
    }
];
const HTTP_STATUTES = {
    OK_200: 200,
    CREATED_201: 201,
    OK_NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
app.get('/', (req, res) => {
    res.json("Hello");
});
app.get('/users', (req, res) => {
    if (req.query.name) {
        const foundUsers = users.filter(({ name }) => name.includes(req.query.name));
        res.json(foundUsers);
        return;
    }
    res.json(users);
});
app.get('/users/:id', (req, res) => {
    const foundUser = users.find(({ id }) => id.toString() === req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    res.json(foundUser);
});
app.post('/users', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(400);
        return;
    }
    const newUser = {
        name: req.body.name,
        id: Math.max(...users.map(({ id }) => id)) + 1
    };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.delete('/users/:id', (req, res) => {
    const indexOfDeletedItem = users.findIndex(({ id }) => id.toString() === req.params.id);
    if (indexOfDeletedItem === -1) {
        res.sendStatus(404);
        return;
    }
    users.splice(indexOfDeletedItem, 1);
    res.sendStatus(204);
});
app.put('/users/:id', (req, res) => {
    if (!req.body.name) {
        res.sendStatus(400);
        return;
    }
    const foundUser = users.find(({ id }) => id.toString() === req.params.id);
    if (!foundUser) {
        res.sendStatus(404);
        return;
    }
    foundUser.name = req.body.name;
    res.status(201).json(foundUser);
});
app.get('/about', (req, res) => {
    res.json('About');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
