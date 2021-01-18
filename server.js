const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongod://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

require("./controller/controller.js");

app.listen(PORT, () => {
    console.log(`Application is now running on port ${PORT}!`);
});