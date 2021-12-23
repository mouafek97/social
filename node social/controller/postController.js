const Post =require("../models/Post");
const { findOne } = require("../models/User");
const User = require("../models/User")
//create a post 
exports.add_post = async (req , res) =>{
    const newPost = new Post (req.body)
    try {
        const  postsaved = await newPost.save() ;
        res.status(200).json(postsaved)
    } catch (err) {
        return res.status(404).json(err)
    }

}
//delete a post 
exports.delete_post = async (req , res) => {
    try { 
        
        const post = await Post.findById(req.params.id)
        if (!post) {
            res.status(403).json('no post found')
            
        } else {
            
        
        if (req.body.userId ===post.userId) {
            await post.deleteOne()
            return res.status(200).json("post deleted")

            
            
        } else {
            return res.status(403).json(" u can delete only ur post ")
            }
   
        
    } }catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }

}
//update a post
exports.update_post= async (req , res ) => {
    try {
        const post = await Post.findById(req.params.id)
        if (req.body.userId ===post.userId) {
            await post.updateOne({$set : req.body})
            return res.status(200).json("post updated ")

            
            
        } else {
            return res.status(403).json(" u can upadate only ur post ")
            }
   
        
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}
//like a post   
exports.like_post =async (req , res ) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({$push : {likes :req.body.userId}})

            return res.status(200).json("u like this post ")
        } else {
            await post.updateOne({$pull : {likes :req.body.userId}})
             return res.status(403).json("u dislike this post")
            
        }
        
    } catch (err) {
        return res.status(500).json(err)

    }

}
//get post
exports.get_post = async (req , res )=> {
    try { 
        const postindb = await Post.findById(req.params.id)
        console.log(postindb)
         res.status(200).json(postindb)
        } catch (err) {
        return res.status(500).json(err)
    }
}
//get time line post
exports.get_timeline_posts = async (req , res) => {
    
    try {   
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts))

        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }

}
exports.get_user_posts = async(req , res)=>{
    try {
        const user = await User.findOne({username:req.params.username})
        const posts = await Post.find({userId : user._id})
        res.status(200).json(posts)        
    } catch (err) {
        res.status(500).json(err)
    }
}
  
