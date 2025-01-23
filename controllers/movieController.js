const index = (req, res) => {
    res.json({
        message: "index"
    })
};

const show = (req, res) => {
    res.json({
        message: "show"
    })
};





module.exports = {
    index,
    show,
};