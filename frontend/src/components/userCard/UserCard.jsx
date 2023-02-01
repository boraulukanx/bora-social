import React, { useState, useContext } from "react";
import "./userCard.css";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "../../context/AuthContext";

function UserCard({ user }) {
  const [image, setImage] = useState(user.profilePicture?.data);
  const { user: currentUser, dispatch } = useContext(AuthContext);

  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?._id)
  );

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (followed) {
        await axios.put(`http://localhost:3001/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:3001/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {}
  };

  return (
    <div className="UserCard">
      <div className="UserCard-Top">
        <div className="userImage">
          <img src={`http://localhost:3001/images/${user.profilePicture}`} />
        </div>
        <div className="userUsername">
          <h3>{user.username}</h3>
        </div>
      </div>
      <div className="userEmail">
        <p>Email:</p>
        <h4>{user.email}</h4>
      </div>
      {user.username !== currentUser.username && (
        <button className="userFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <ChatIcon /> : <NotificationsIcon />}
        </button>
      )}
    </div>
  );
}

export default UserCard;
