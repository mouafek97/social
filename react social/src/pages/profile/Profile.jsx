import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios   from "axios";
import { useParams } from "react-router";



export default function Profile() {
  const pf=process.env.REACT_APP_publiccfolder
  const [user,setUser] = useState({})
  const username = useParams().username ; 
  
  useEffect(()=>{
    const fetchUser =async()=>{
      const res=await axios.get(`/user/find?username=${username}` );
      console.log(res.data)
      console.log('data found')
      setUser(res.data)
      console.log('data save')


     }
    fetchUser();
    
  },[username]);
  console.log("test passage user" )
  console.log(user)
  

  

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture|| pf+'post/3.jpeg'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={pf+user.profilePicture||pf+"/person/noavatar.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.username}</h4>
                <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userneme={username} />
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
