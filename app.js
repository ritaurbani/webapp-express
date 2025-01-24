//import
const express = require("express")
const moviesRouter = require("./routers/movies")
const errorsHandler = require("./middleware/errorsHandler")
const cors = require("cors")

//creazione app express
const app = express();
const port = process.env.SERVER_PORT;

//Middleware-imposto indirizzo mio front-end - TOGLIERE SLASH FINALE - METTERE IN VARIABILE AMBIENTE
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

//Middleware pics - to get access to public folder
app.use(express.static("public"))

//Definisco i gruppi delle rotte: la prima si chiamera movies..
app.use("/movies", moviesRouter);

//registro middleware generale di tutti-cattura tutti gli errori - ma dobbiamo usare next()
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})