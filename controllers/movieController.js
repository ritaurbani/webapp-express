const db_Connection = require("../data/db_Connection")

//INDEX
const index = (req, res, next) => {
    //QUERY SENZA FILTRO

    //controllo se ci sono query-string-params e le prelevo
    //stringa che uso come filtro nel ?search=la  search e' la key dell oggetto, per avere valore: filters.search
    const filters = req.query;
    //questi 2 valore sono le cose che differiscono tra ricerca con o senza filtri
    let sql = "SELECT * FROM movies"
    const params = []

    //QUERY CON FILTRI
    if (filters.search) {
        sql += `
        WHERE title LIKE ?`;
        params.push(`%${filters.search}%`);
    } 
        db_Connection.query(sql, params, (err, movies) => {
            if (err) {
                return next(new Error("Errore interno del server"))
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