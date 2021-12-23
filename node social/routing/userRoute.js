const router =require("express").Router()
const User = require("../models/User")

const userController = require("../controller/userController")
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
router.put('/:id' , userController.update_user)
router.delete('/:id' , userController.delete_user)
router.get('/find' , userController.get_user)
router.put('/follow/:id' , userController.follow)
router.put('/unfollow/:id' , userController.unfollow)

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.followings.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
      console.log(friendList)
    } catch (err) {
      res.status(500).json(err);
      console.log(err)
    }
  });
module.exports = router 