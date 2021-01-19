const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
const db = require("./models");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", (req,res) => {
    db.Workout.find({}, null, { sort: { day: 1 }})
    .populate("workouts")
    .then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

app.put("/api/workouts/:id", (req,res) => {
    let workoutID = req.params.id;
    db.Workout.create(req.body)
    .then(({ _id }) => {
        db.Workout.findOneAndUpdate(
            { _id: workoutID },
            { $push: { exercises: _id }},
            { new: true }
        );
    }).then((dbWorkout) => {
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

app.post("/api/workouts", (req,res) => {
    db.Workout.create(req.body)
    .then((dbWorkout) => {
        console.log(dbWorkout);
        res.json(dbWorkout);
    }).catch((err) => {
        res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`Application is now running on port ${PORT}!`);
});
