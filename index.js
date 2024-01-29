require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests

const todos = [
    {
        id: 1,
        title: "Todo 1",
        desc: "This is my first Todo",
        completed: true,
    },
    {
        id: 2,
        title: "Todo 2",
        desc: "This is my second Todo",
        completed: true,
    },

    {
        id: 3,
        title: "Todo 3",
        desc: "This is my third Todo",
        completed: true,
    },

    {
        id: 4,
        title: "Todo 4",
        desc: "This is my fourth Todo",
        completed: true,
    },

    {
        id: 5,
        title: "Todo 5",
        desc: "This is my fifth Todo",
        completed: true,
    },
];

app.get("/", (req, res) => {
    res.status(200).json({
        title: "Welcome To My todo Express Server Access!",
        description: "GET / (welcome)| GET /todos (all Todos) | GET /todos/:id (single Todo) | POST /todos | PUT /todos/:id | DELETE /todos/:id "
    });
});

app.get("/todos", (req, res) => {
    res.status(200).json(todos);
});

app.get("/todos/:id", (req, res) => {
    const todo = todos.find((todo) => todo.id == req.params.id); // Loose equality
    if (todo) {
        res.status(200).json({data: todo});
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

app.post("/todos", (req, res) => {
    const newTodo = req.body;
    todos.push(newTodo);
    res.status(201).json({message: "Todo Created Successfully"});
});

app.put('/todos/:id', (req, res) => {
    const todo = todos.find((todo) => todo.id == req.params.id); // Loose equality
    if (todo) {
        const {title, desc, completed} = req.body;
        todo.title = title;
        todo.desc = desc;
        todo.completed = completed;
        res.status(200).json({data: todo, message: "Todo Updated Successfully"});
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

app.delete("/todos/:id", (req, res) => {
    const todoIndex = todos.findIndex((todo) => todo.id == req.params.id); // Loose equality
    if (todoIndex !== -1) { // Check if todoIndex is not -1
        todos.splice(todoIndex, 1);
        res.status(200).json({message: "Todo deleted Successfully"});
    } else {
        res.status(404).json({message: "Todo Not Found"});
    }
});

app.listen(PORT, () => console.log(`Listening http://localhost:${PORT}`));
