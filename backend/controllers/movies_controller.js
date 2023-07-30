const Movie = require("../models/movies");
//Create movie
exports.movieCreate = async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Your are not allowed");
  }
};

//UPDATE
exports.movieUpdate = async function (req, res) {
  if (req.user.isAdmin) {
    try {
      const updatedmovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedmovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Your are not allowed");
  }
};
//DELETE
exports.movieDelete = async function (req, res) {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("the movie has been delete");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not to allowed");
  }
};
//GET
exports.movieGetOne = async function (req, res) {
  const _id = req.params.id
  try {
    const movie = await Movie.findById(_id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET LIST MOVIE
exports.getMovieList = async function (req, res) {
  const content = req.body;
  try {
    const movie = await Movie.aggregate([
      { $match: { _id: { $in: content } } },
    ]);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET RANDOM MOVIE
exports.movieGetRandom = async function (req, res) {
  try {
    const movie = await Movie.aggregate([
      { $match: { type: 'movie', 'imdb.rating': { $gt: 7 }, 'imdb.votes': { $gt: 20000 }, } },
      { $sample: { size: 200 } },
      {
        $project: {
          poster: 1,
          plot: 1,
          fullplot: 1,
          genres: 1,
          cast: 1,
          title: 1,
          countries: 1,
          rated: 1,
          year: 1,
          imdb: 1,
          type: 1,
          directors: 1,
          writes: 1
        }
      },
      { $sort: { year: -1 } }
    ]);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET MOVIE BY GENRE
exports.movieGetRandomGenre = async function (req, res) {
  const genre = req.params.genre;
  try {
    const movie = await Movie.aggregate([
      { $match: { genres: { $in: [genre] }, 'imdb.rating': { $gt: 7 }, 'imdb.votes': { $gt: 20000 }, } },
      { $sample: { size: 100 } },
      {
        $project: {
          poster: 1,
          plot: 1,
          fullplot: 1,
          genres: 1,
          cast: 1,
          title: 1,
          countries: 1,
          rated: 1,
          year: 1,
          imdb: 1,
          type: 1,
          directors: 1,
          writes: 1
        }
      }
    ]);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};
//GET MOVIE BY FILTER
// exports.movieGetByFilter = async function (req, res) {
//   const genre = req.params.value;
//   const countries = req.params.value;
//   const languages = req.params.value;
//   const year = Number(req.params.value);

//   try {
//     const movie = await Movie.aggregate([
//       {
//         $match:
//         {
//           $or: [
//             { genres: { $in: [genre] } },
//             { year: year },
//             { countries: { $in: [countries] } },
//             { languages: { $in: [languages] } },
//           ],
//         },
//       },
//       { $sample: { size: 100 } },
//     ]);
//     res.status(200).json(movie);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
//GET MOVIE BY FILTER
exports.getMovieByFilter = async function (req, res) {
  const query = {}
  for (const key in req.query) {
    if (key === 'userId') { query[key] = undefined }
    else if (key === 'year') {
      query[key] = Number(req.query[key])
    }
    else {
      query[key] = req.query[key];
    }
  }
  try {
    const movie = await Movie.aggregate([
      { $match: query },
      { $sample: { size: 100 } },
      {
        $project: {
          poster: 1,
          plot: 1,
          fullplot: 1,
          genres: 1,
          cast: 1,
          title: 1,
          countries: 1,
          rated: 1,
          year: 1,
          imdb: 1,
          type: 1,
          directors: 1,
          writes: 1
        }
      }
    ])
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

//SEARCH MOVIE
exports.movieSearch = async (req, res) => {
  const searchQuery = req.params.searchQuery
  try {
    const movie = await Movie.aggregate([
      {
        $search: {
          index: "movie_search",
          autocomplete: {
            path: "title",
            query: searchQuery,
            // "fuzzy": {
            //   "maxEdits": 1,
            //   "prefixLength": 1,
            //   "maxExpansions": 256
            // }
          }
        }
      },
      {
        $project: {
          poster: 1,
          plot: 1,
          fullplot: 1,
          genres: 1,
          cast: 1,
          title: 1,
          countries: 1,
          rated: 1,
          year: 1,
          imdb: 1,
          type: 1,
          directors: 1,
          writes: 1
        }
      }
    ]);
    res.status(200).json(movie);
  }
  catch (err) {
    res.status(500).json(err)
  }
}

exports.movieArray = async (req, res) => {
  try {
    const movie = await Movie.aggregate([
      {
        $unwind: "$genres"
      },
      {
        $group: {
          _id: null,
          genres: {
            "$addToSet": "$genres"
          },

        }
      },
    ]);
    res.status(200).json(movie);
  }
  catch (err) {
    res.status(500).json(err)
  }
}