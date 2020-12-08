const express = require("express");
const layouts = require("express-ejs-layouts")
const app = express();

const PORT = process.env.PORT || 45678

app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(layouts)

// Determine platform
app.use((request, response, next) => {
  const userAgent = request.get("User-Agent")
  response.locals.ios_app = userAgent.includes("Turbo Native iOS")
  next()
})

// Logging

app.use((request, response, next) => {
  console.log(`${Date()} -- ${request.method} ${request.path}`)
  next()
})

// Routes

app.get("/", (request, response) => {
  response.render("index", { title: "Turbo Native Demo" })
})

app.get("/one", (request, response) => {
  response.render("one", { title: "Page One" })
})

app.get("/two", (request, response) => {
  response.render("two", { title: "Page Two", action: request.query.action })
})

app.get("/long", (request, response) => {
  response.render("long", { title: "Long Page" })
})

app.get("/scroll", (request, response) => {
  response.render("scroll", { title: "Scroll Restoration" })
})

app.get("/new", (request, response) => {
  response.render("new", { title: "Modal Page" })
})

app.post("/new", (request, response) => {
  response.redirect("/success")
})

app.get("/success", (request, response) => {
  response.render("success", { title: "Thank you!" })
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
