const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    song_url: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    artist: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    artist_img: {
      type: String,
      // enum:[]
      // required: [true, 'Please provide a title'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Song', SongSchema);
