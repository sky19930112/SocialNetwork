const { User, Thought } = require("../model");

const thoughtController = {
  getThought(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },


  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'No such ID' });
        } res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },


  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thought: _id } },
          { new: true }
        );
      })
      .then((thought) => {
        if (!thought) {
        return res.status(404).json({ message: 'User ID not found' });
        } res.json({ message: 'Thought created!' });
    })
      .catch((err) => res.status(500).json(err));
  },


  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, New: true }
    )
      .then((ID) => {
        if (!ID) {
          return res.status(404).json({ message: 'ID error' });
        } res.json(ID);
      })
      .catch((err) => res.status(500).json(err));
  },


  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'ID error' });
        }
        return User.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { thought: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
      if (!thought) {
        return res.status(404).json({ message: 'User ID error' });
      } res.json({ message: 'Thought deleted!' });
    })
      .catch((err) => res.status(500).json(err));
  },

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'ID not found' });
      } res.json(thought);
    })
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
      if (!thought) {
        return res.status(404).json({ message: 'ID error' });
      } res.json(thought);
    })
      .catch((err) => res.status(500).json(err));
  },
  //add reaction to thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
     {_id: req.params.thoughtID},
     {$addToSet: {reactions: req.body}},
     {runValidators: true, new: true}
    )
    .then((thought) =>
      !thought
        ? res.status(404).json({message: "can not find this ID"})
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err))
  },
  //delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtID},
      {$pull:{reactions: {reactionID: req.params.reactionID}}},
      {runValidators: true, new: true}
    )
    .then((thought) =>
     !thought
      ? res.status(404).json({message: "ID not matching"})
      : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  }
};

module.exports = thoughtController;