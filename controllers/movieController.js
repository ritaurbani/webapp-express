const db_Connection = require("../data/db_Connection")

//INDEX
const index = (req, res, next) => {
   //controllo se ci sono query-string-params e le prelevo
    //stringa che uso come filtro nel ?search=la search e'la key dell oggetto req.query che contiene i parametri della query string passati nella URL
    const filters = req.query;
    //ogni chiave di questo oggetto e`un parametro nella URL
    // const { title, genre, year } = req.query;

    //stringa di base - seleziona tutti i films
    let sql = "SELECT * FROM movies"
    //parametri dinamici da passare alla query - per evitare injection - valore della key
    const params = []
    //tutti i filtri che saranno aggiunti alla query
    const conditions = []

    //Aggiungiamo filtri alla query - se search e presente aggiungiamo condizione per filtrare i risultati in base al titolo
    if (filters.search) {
        conditions.push("title LIKE ?") 
        params.push(`%${filters.search}%`)
    }

    // if (filters.genre) {
    //     conditions.push("genre = ?");
    //     params.push(`%${filters.search}%`)
    // }

    //CICLO PER AGGIUNGERE ALTRI FILTRI - ITERA SUI PARAMETRI DI RICERCA
    for (const key in req.query) {
        if (key !== "search") {
            //SE PARAMETRO NON E SEARCH AGGIUNGE CONDIZIONE ALLA QUERY (genre = ?)
            conditions.push(`${key} = ?`);
            //AGGIUNGE VALORE DEL PARAMETRO (genre=comedy, aggiunge comedy)
            params.push(req.query[key])
        }
    }

    //costruire query finale - SE CI SONO FILTRI ALLORA..AGGIUNGI WHERE...
    if (conditions.length > 0) {
        //UNISCE TUTTE LE CONDIZIONI CON L OPERATORE AND EX: ..WHERE title LIKE ? AND genre =? AND year = ?
        sql += ` WHERE ${conditions.join(" AND ")}`
    }

    //ESECUZIONE QUERY - SE C E ERRORE INVIA UN ERRORE AL MIDDLEWARE DI GESTIONE DEGLI ERRORI
        db_Connection.query(sql, params, (err, movies) => {
            if (err) {
                return next(new Error("Errore interno del server")) //Error(err.message)
            }

            return res.status(200).json({
                status: "success",
                data: movies,
            });
});
};


//SHOW
const show = (req, res, next) => {
    const id = req.params.id
    const sql = "SELECT * FROM movies WHERE id = ?"
    const sqlReviews = `
  SELECT reviews.* 
  FROM reviews
  JOIN movies
  on  reviews.movie_id= movies.id
  WHERE movies.id = ?`

    db_Connection.query(sql, [id], (err, movies) => {

        if (err) {
            return next(new Error("Errore interno del server"))
        }
        if (movies.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "movie not found"
            });
        }
        // qui quando gestiamo risposta facciamo join
        db_Connection.query(sqlReviews, [id], (err, reviews) => {
            if (err) {
                return next(new Error("Errore interno del server"))
            }
            return res.status(200).json({
                status: "success",
                data: {
                    ...movies[0],
                    reviews
                }
            })
        })
    })
};





module.exports = {
    index,
    show,
};