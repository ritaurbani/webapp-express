const db_Connection = require("../data/db_Connection")

const index = (req, res) => {
    const sql = "SELECT * FROM `movies`"

    db_Connection.query(sql, (err, movies) => {
        if (err) {
            const resObj = {
                status: "fail",
                message: "errore del server"
            };
            if (process.env.ENVIRONMENT === "development") {
                resObj.detail = err.stack;
            }
            return res.status(500).json({ resObj })
        }
        return res.status(200).json({
            status: "success",
            data: movies,
        });
    });
};

const show = (req, res) => {
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
            return res.status(500).json({
                message: "errore del server"
            })
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
                const resObj = {
                    status: "fail",
                    message: "Errore del server"
                };
                if (process.env.ENVIRONMENT === "development") {
                    resObj.detail = err.stack;
                }
                return res.status(500).json(resObj)
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