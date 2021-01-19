const router = require("express").Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/api/workouts", (req, res) => {
    Fit.find()
    .then((data) => {
        res.json(data);
    });
});

router.post("/api/workouts", (req, res) => {
    Fit.create({})
    .then((data) => {
        res.json(data);
    });
});

router.put("/api/workouts/:id", ({body, params}, res) => {
    Fit.findByIdAndUpdate(
        params.id,
        { $push: {exercised: body } },
        { new: true, runValidators: true }
    )
    .then((data) => {
        res.json(data);
    });
});

module.exports = router;
