import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import { Add , remove } from "@material-ui/icons";


export default function Rightbar({ user }) {
  console.log("recive user test")
  console.log(user)
  const pf =process.env.REACT_APP_publiccfolder;
  const [friends ,setfriends] = useState([]) ;
  const {user:currentuser}= useContext(AuthContext)
  const[followed , setfollowed] = useState(false)





   useEffect(()=>{
     const getfriends = async (req , res )=>{
       try {
         const friendlist = await axios.get('/user/friends/'+user._id)
         setfriends(friendlist.data)
       } catch (err) {console.log(err)} }
     getfriends();
     }, )



  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
         
        </ul>
      </>
    );
  };
  const handleclick =async()=>{
    try {if (followed){
      await axios.put("/user/unfollow/"+user._id  ,{userId : currentuser.user._id})

    } else {
      await axios.put("/user/follow/"+user._id ,{userId : currentuser.user._id} )
    }
  } catch (err) {
      console.log(err)
    }  setfollowed(!followed)
  }

  const ProfileRightbar = () => {
    return (
      <>
      {user.username !==currentuser.user.username &&(
        <button className="rightbarFollowButton" onClick={handleclick}>
          {followed? "unfollowed " :"follow"}
          {followed? <remove/> : <Add/> }
          

        </button>
      )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship===1 ? "married" :user.relationship===1 ? "married": "--"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? pf+friend.profilePicture
                      : pf+"person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
