const express = require("express");
const layouts = require("express-ejs-layouts")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const multer = require('multer')
const upload = multer()
const app = express();

// Ensure we use environment port if available for deploying
const PORT = process.env.PORT || 45678

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use('/dist', express.static(__dirname + '/node_modules/@hotwired/turbo/dist/'));
app.use(cookieParser())
app.use(layouts)

// Turbo version
app.use((request, response, next) => {
  response.locals.useTurbolinks = request.cookies.turbolinks || request.query.turbolinks
  
  if (response.locals.useTurbolinks) {
    // Set cookie for this session
    response.cookie("turbolinks", "1")
  } else {
    response.clearCookie("turbolinks")
  }

  next()
})

// Determine platform
app.use((request, response, next) => {
  const userAgent = request.get("User-Agent")
  response.locals.native_app = userAgent.includes("Turbo Native")
  next()
})

// Auth
app.use((request, response, next) => {
  response.locals.authenticated =  request.cookies && request.cookies.authenticated
  next()
})

// Logging

app.use((request, response, next) => {
  console.log(`${Date()} -- ${request.method} ${request.path}`)
  next()
})

// Routes

app.get("/", (request, response) => {
  response.render("index", { title: "Turbo Native Demo", page_class: "index" })
})

app.get("/one", (request, response) => {
  response.render("one", { title: "How’d You Get Here?" })
})

app.get("/two", (request, response) => {
  response.render("two", { title: "Push or Replace?", action: request.query.action })
})

app.get("/long", (request, response) => {
  response.render("long", { title: "A Really Long Page" })
})

app.get("/scroll", (request, response) => {
  response.render("scroll", { title: "Restoring Your Scroll" })
})

app.get("/follow", (request, response) => {
  response.redirect("/redirected")
})

app.get("/redirected", (request, response) => {
  response.render("redirected", { title: "Redirected Page" })
})

app.get("/files", (request, response) => {
  response.render("files", { title: "Handling Files" })
})

app.get("/new", (request, response) => {
  response.render("new", { title: "A Modal Webpage" })
})

app.post("/new", (request, response) => {
  response.redirect("/success")
})

app.get("/success", (request, response) => {
  response.render("success", { title: "It Worked!" })
})

app.get("/numbers", (request, response) => {
  response.render("numbers", { title: "A List of Numbers" })
})

app.get("/nonexistent", (request, response) => {
  response.status(404).send("Not Found")
})

app.get("/protected", (request, response) => {
  if (response.locals.authenticated) {
    response.render("protected", { title: "Protected Webpage" })
  } else {
    response.status(401).send("Unauthorized")
  }
})

app.get("/signin", (request, response) => {
  response.render("signin", { title: "Sign In" })
})

app.post("/signin", upload.none(), (request, response) => {
  if (! request.body.name) {
    response.status(422).render("signin", { title: "Sign In", error: true })
    return;
  }

  // Cookie expires in one day
  const expiration = new Date(Date.now() + 86400000)

  response.cookie("authenticated", request.body.name, { expires: expiration, httpOnly: true })
  response.redirect("/")
})

app.post("/signout", (request, response) => {
  response.clearCookie("authenticated")
  response.redirect("/")
})

app.get("/slow", (request, response) => {
  setTimeout(() => {
      response.render("slow", { title: "Slow-loading Page" })
  }, 3000)
})

app.get("/test", (request, response) => {
  response.sendStatus(200)
})

const listener = app.listen(PORT, () => {
  console.log("Server is listening on port " + listener.address().port);
})
