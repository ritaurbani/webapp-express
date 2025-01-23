//import
const express = require("express")
const moviesRouter = require("./routers/movies")

//creazione app express
const app = express();
const port = process.env.SERVER_PORT;

//Definisco i gruppi delle rotte: la prima si chiamera movies..
app.use("/movies", moviesRouter)

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})