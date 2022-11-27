const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// route to localhost/api/thought
router.route("/")
  .get(getThought)
  .post(createThought);

// route to localhost/api/thought/:thoughtID
router.route("/:thoughtID")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route to localhost/api/thought/:thoughtID/reaction
router.route('/:thoughtID/reaction')
  .post(addReaction);

// route to localhost/api/thought/:thoughtID/reaction/:reactionId
router.route('/:thoughtID/reaction/:reactionId')
  .delete(deleteReaction);

module.exports = router;
