const List = require("../models/list");
const Movie = require('../models/movies')

//Create movie list
exports.listCreate = async (req, res) => {
  let userId = req.query.userId;
  const movie_id = req.params.movie_id;
  const newList = new List({
    user: userId,
    content: movie_id,
  })
  const user = await List.findOne({ user: userId })
  if (!user) {
    try {
      await newList.save();
      res.status(201).json({ newList, msg: 'New list created!' });
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(200).json({ newList, msg: 'Already have a list!' });
  };
}
//GET ONE LIST
exports.listGetOne = async (req, res) => {
  let userId = req.query.userId;
  try {
    const list = await List.findOne({ user: userId });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Update list
exports.updateList = async (req, res) => {
  let userId = req.query.id;
  const movie_id = req.params.movie_id
  const oldList = await List.findOne({ user: userId })
  if (oldList.content.includes(movie_id)) {
    res.json({ msg: 'Movie is already on the list!' });
  } else {
    try {
      const updatedList = await List.updateOne(
        { user: userId },
        { $push: { content: movie_id } },
        { new: true }
      )
      res.status(200).json({ updatedList, msg: 'Movie has been added to list!' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
};


//DELETE ONE LIST
exports.listDeleteOne = async (req, res) => {
  let userId = req.query.id;
  try {
    const list = await List.findOneAndDelete({ user: userId });
    res.status(200).json({ list, msg: "List has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE ONE MOVIE FROM LIST
exports.listDeleteOneMovie = async (req, res) => {
  let userId = req.query.userId;
  let movie_id = req.params.movie_id
  try {
    const list = await List.updateOne(
      { user: userId },
      { $pull: { content: movie_id } }
    );
    res.status(200).json({ list, msg: "Movie has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};
