const express = require('express');
const app = express();
const port = process.env.PORT || 3042;
const controller = require('./src/controller');

app.get("/api", controller.getData)

app.use(function(req, res) {
    console.log("404");
    res.status(404).json({msg: "Route not found !"});
});

console.log(`myEpitech - Lametric App sever started on: ${port}`);
app.listen(port);