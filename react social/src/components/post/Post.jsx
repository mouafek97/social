import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";


export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})
  const pf =process.env.REACT_APP_publiccfolder;
  const {user:currentUser}=useContext(AuthContext)


  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser.user._id))
  } , [currentUser.user._id, post.likes])



  useEffect(()=>{
    const fetchUser =async()=>{
      const res=await axios.get(`/user/find?userId=${post.userId}`);
      setUser(res.data)

     }
    fetchUser();
    
  },[post.userId]);

  const likeHandler =()=>{
    try {
      axios.put("/post/like/"+post._id , {userId:currentUser.user._id});

      
    } catch (err) {
      console.log(err)
    }
   
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`} >
            <img
              className="postProfileImg"
              src={pf+user.profilePicture || pf+"person/noavatar.png"}
              alt=""
            />
            </Link>
            
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={pf+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            
            <img className="likeIcon"  src={`${pf}like.png`}onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${pf}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}
