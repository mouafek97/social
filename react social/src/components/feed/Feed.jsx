import Share from "../share/Share";
import "./feed.css";
import Post from "../post/Post"

import { useContext, useEffect, useState } from "react"
import axios   from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({userneme}) {
  const { user } = useContext(AuthContext);

  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    const fetchPosts =async()=>{
      const res= userneme
      ?await axios.get("/post/userposts/"+ userneme)
      :await axios.get("/post/timeline/"+user.user._id) ;
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))

     }
    fetchPosts();
    
  },[userneme,user.user._id])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
