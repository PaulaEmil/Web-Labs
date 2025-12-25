const express = require("express");
const app = express();

app.use(express.json());   // <-- IMPORTANT

const posts = [];

// GET post by ID
app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.find(p => p.id == id); // <-- fixed array name

    if (!post)
        return res.status(404).send("Post not found");

    res.send(post);
});

// POST new post
app.post('/posts', (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
    };

    posts.push(newPost);
    res.status(201).send("Received New Post from You!");
});

app.get("/", (req, res) => {
    res.send("hello Carol");
});

app.listen(3000, () => {
    console.log("server is running");
});
