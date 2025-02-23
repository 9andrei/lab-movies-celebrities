const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

module.exports.create =((req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            console.log(celebrities)
            res.render("movies/new-movie", { celebrities })
        })
    
})

module.exports.doCreate =((req, res, next) => {
    Movie.create(req.body)
        .then(() => {
            console.log(req.body);
            res.redirect("/movies")
        })
        .catch((e) => {
            console.log(e)
            res.render("movies/new-movie")
        })
});

module.exports.list =((req, res, next) => {
    Movie.find()
    .then((movies) =>{
        res.render("movies/movies", { movies })
    })
    .catch(e => console.error(e))
});

module.exports.detail = ((req, res, next) => {
    const { id } = req.params;
    Movie.findById(id)
        .populate("cast")
        .then((movie) => {
            console.log(movie)
            res.render("movies/movie-details", movie )
        } )
})

module.exports.delete = ((req, res, next) => {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch((e) => console.error(e))
});

module.exports.edit = ((req, res, next) => {
    Promise.all([Movie.findById(req.params.id), Celebrity.find()])
        .then(([movie, celebrities]) => {
            console.log(movie)
            res.render("movies/edit-movie", { movie, celebrities })
        })
        .catch((e) => console.error(e))
})

module.exports.doEdit = ((req, res, next) => {
    Movie.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.redirect(`/movies/${req.params.id}`))
        .catch(() => res.redirect(`/movies/${req.params.id}/edit`))
})