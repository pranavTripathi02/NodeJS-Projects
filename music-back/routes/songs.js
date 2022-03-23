const express = require('express');
const router = express.Router();
const {
  getAllSongs,
  addSong,
  getSong,
  updateSong,
  deleteSong,
} = require('../controllers/songs');

router.route('/').get(getAllSongs).post(addSong);
// router.route('/:singer').get(songsBySinger);
router.route('/:id').get(getSong).patch(updateSong).delete(deleteSong);

module.exports = router;
