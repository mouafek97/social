import "./share.css";
import {PermMedia, Label,Room, Cancel,EmojiEmotions} from "@material-ui/icons"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useRef, useState } from "react";
import axios from "axios";



export default function Share() {
  const { user } = useContext(AuthContext);
  const pf =process.env.REACT_APP_publiccfolder;
  const desc = useRef() ; 
  const [file , setFile ]= useState(null) ; 
  
  const submithandler= async (e)=>{
   e.preventDefault() ; 
   const newPost= {
     userId :user.user._id , 
     desc : desc.current.value ,

     };
     if (file ) {
       const data = new FormData();
       const fileName =file.name ;
       data.append('file' , file ) ;
       data.append('name' , fileName )
       newPost.img= fileName ; 
       try {
         await axios.post("/api/upload/" , data)
         
       } catch (err) {
         console.log(err)
      }

     }
     try {
      await axios.post("/post/" , newPost)
      window.location.reload() ; 
       
     } catch (err) {
       console.log(err)
     }
  }




  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg"
          src={user.user.profilePicture? pf+user.user.profilePicture : pf+"/person/noavatar.png"}
            alt="" />
          <input
            placeholder={"What's in your mind "+ user.user.username +"   ??  "}
            className="shareInput" ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" on onSubmit={submithandler}>
            <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
        </form>
      </div>
    </div>
  );
}
