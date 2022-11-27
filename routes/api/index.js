const router = require("express").Router();
const userRoutes = require("./userRoute");
const thoughtRoute = require("./thoughtRoute");

router.use("/user", userRoutes);
router.use("/thought", thoughtRoute);

module.exports = router;
