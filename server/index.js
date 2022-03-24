const express = require("express");
const chalk = require("chalk");
const path = require("path");
const { addNote, getNotes, removeNote } = require("./notes.controller");

const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Expess App",
    notes: await getNotes(),
    created: false,
  });
});

app.post("/", async (req, res) => {
  await addNote(req.body.title);
  res.render("index", {
    title: "Expess App",
    notes: await getNotes(),
    created: true,
  });
});

app.delete("/:id", async (req, res) => {
  const id = req.params.id;
  removeNote(id);
  res.render("index", {
    title: "Expess App",
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server started listening on port ${port}`));
});
