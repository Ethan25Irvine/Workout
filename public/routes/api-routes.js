// const express = require("express");
// // const app = express();
const db = require("../../models")

module.exports = function(app){
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({})
          .then(Workout => {  
            res.json(Workout);
          })
          .catch(err => {
            res.json(err);
          });
      });
      
      
      
      app.post("/api/workouts", ({ body }, res) => {
          
        db.Workout.create(body)
        
          .then(result => {
            res.json(result);
          })
          .catch(err => {
            res.json(err);
          });
      });
      
      app.put("/api/workouts/:id", function(req, res) {
      let duration = req.body.duration
      
      db.Workout.findByIdAndUpdate(req.params.id, {$push:{exercises:req.body}, $inc:{totalDuration: duration}})
      .then(result => res.json(result))
      .catch(err => {
          res.json(err);
        });
      })
      
      app.get("/api/workouts/range", (req, res) => {
          db.Workout.find({}).sort({ _id: -1 }).limit(7)
            .then(Workout => {
               
              res.json(Workout);
            })
            .catch(err => {
              res.json(err);
            });
        });
}






