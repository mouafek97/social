const router =require("express").Router()
const postController = require("../controller/postController")
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
     });
router.post('/' , postController.add_post)

router.put('/:id' , postController.update_post)
router.delete('/:id' , postController.delete_post)
router.put('/like/:id' , postController.like_post)
router.get('/:id' , postController.get_post)
router.get('/timeline/:userId' , postController.get_timeline_posts)
router.get('/userposts/:username' , postController.get_user_posts)








module.exports = router