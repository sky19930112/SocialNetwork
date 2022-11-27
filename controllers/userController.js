const { User, Thought } = require("../model");

const userController = {
  getUser(req, res) {
    User.find({})
      .select('-__v')
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("thought")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "This User does not exist" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
 

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },


  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) => {
         if (!user) {
          return res.status(404).json({ message: 'id does not match user' });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
       if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        return Thought.deleteMany({ _id: { $in: user.thought } });
      })
      .then(() => {
        res.json({ message: 'User and thought deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },


  deleteFriend(req, res) {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull:{friends: req.params.friendId}},
        {new: true }
        )
        .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;