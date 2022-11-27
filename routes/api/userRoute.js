const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// route to localhost/api/users GET all and POST 
router.route('/').get(getUser).post(createUser);

// route to localhost/api/users/:userId GET one user, PUT and DELETE by user's ID
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route to localhost/api/users/:userId/friends/:friendId POST and DELETE a friend by ID
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;