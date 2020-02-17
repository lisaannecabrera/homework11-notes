"use strict";

const array = require("../db/db.json");
const fs = require("fs");
const path = require("path");

module.exports = app => {
  app.get("/api/notes", (req, res) => {
    return res.json(array);
  });
  app.post("/api/notes", (req, res) => {
    array.push(req.body);
    for (let i = 0; i < array.length; i++) {
      array[i].id = i + 1;
    }

    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(array),
      err => {
        if (err) throw err;
      }
    );
    return res.json(true);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    let index;
    for (let i in array) {
      if (id === array[i].id) {
        index = i;
      }
    }
    array.splice(index, 1);
    for (let i in array) {
      array[i].id = i;
    }
    fs.writeFile(
      path.join(__dirname, "../db/db.json"),
      JSON.stringify(array),
      err => {
        if (err) throw err;
      }
    );
    return res.json(true);
  });
};
