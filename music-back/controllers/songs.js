const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../error');
const Song = require('../models/Song');

const addSong = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const song = await Song.create(req.body);
  res.status(StatusCodes.CREATED).json(song);
};
const getAllSongs = async (req, res) => {
  const { title, artist } = req.query;
  const queryObj = {};
  if (artist) queryObj.artist = artist;
  if (title) queryObj.title = title;
  // console.log(queryObj);
  const songs = await Song.find(queryObj);
  if (!songs) {
    throw NotFoundError('No songs in DB');
  }
  res.status(StatusCodes.OK).json({ songs });
};
const getSong = async (req, res) => {
  const { id: songID } = req.params;
  const song = await Song.findById({ _id: songID });
  if (!song) {
    throw new NotFoundError(`No songs match with id ${songID}`);
  }
  res.status(StatusCodes.OK).json(song);
};
// const songsBySinger = async (req, res) => {};
const updateSong = async (req, res) => {
  // console.log(req.body);
  const {
    body: { title, artist, song_url, artist_url },
    params: { id: songID },
  } = req;
  const song = await Song.findByIdAndUpdate({ _id: songID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!song) {
    throw new NotFoundError(`No songs found with id ${songID}`);
  }
  res.status(StatusCodes.OK).json(song);
};
const deleteSong = async (req, res) => {
  const { id: songID } = req.params;
  const song = await Song.findByIdAndDelete({ _id: songID });
  if (!song) {
    throw new NotFoundError(`No songs found with id ${songID}`);
  }
  res.status(StatusCodes.OK).json(song);
};

module.exports = {
  getAllSongs,
  addSong,
  getSong,
  updateSong,
  deleteSong,
};
