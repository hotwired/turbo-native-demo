const express = require("express");
const layouts = require("express-ejs-layouts")
const app = express();

const PORT = 45678

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(layouts)

app.get("/", (request, response) => {
  response.render("index", { title: "Turbo Native Demo" })
})

app.get("/one", (request, response) => {
  response.render("one", { title: "Page One" })
})

app.get("/two", (request, response) => {
  response.render("two", { title: "Page Two", action: request.query.action })
})

app.get("/new", (request, response) => {
  response.render("new", { title: "Modal Page" })
})

app.get("/numbers", (request, response) => {
  response.render("numbers", { title: "Numbers" })
})

app.get("/nonexistent", (request, response) => {
  response.status(404).send("Not Found")
})

app.get("/protected", (request, response) => {
  response.status(401).send("Unauthorized")
})

app.get("/slow", (request, response) => {
  setTimeout(() => {
      response.render("slow", { title: "Slow Page" })
  }, 3000)
})

const listener = app.listen(PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
})
