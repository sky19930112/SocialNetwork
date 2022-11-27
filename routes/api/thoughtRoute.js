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

// route to localhost/api/thought/:thoughtId
router.route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// route to localhost/api/thought/:thoughtId/reaction
router.route('/:thoughtId/reaction')
  .post(addReaction);

// route to localhost/api/thought/:thoughtId/reaction/:reactionId
router.route('/:thoughtId/reaction/:reactionId')
  .delete(deleteReaction);

module.exports = router;
