//import
const express = require("express")
const moviesRouter = require("./routers/movies")
const errorsHandler = require("./middleware/errorsHandler")

//creazione app express
const app = express();
const port = process.env.SERVER_PORT;

//Definisco i gruppi delle rotte: la prima si chiamera movies..
app.use("/movies", moviesRouter);


//registro middleware generale di tutti-cattura tutti gli errori - ma dobbiamo usare next()
app.use(errorsHandler);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
})