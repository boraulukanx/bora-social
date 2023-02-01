import "./sidebar.css";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import GroupsIcon from "@mui/icons-material/Groups";
import { AuthContext } from "../../context/AuthContext";
import { React, useContext, useEffect, useState } from "react";
import axios from "axios";
import CloseFriend from "../closeFriend/CloseFriend";

export default function Sidebar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(
          "http://localhost:3001/users/friends/" + currentUser._id
        );
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeedIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Friends</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </li>
          <li className="sidebarListItem">
            <GroupsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">People Around You</span>
          </li>
        </ul>
        <hr className="sidebarHr" />
        <h4 className="sidebarTitle">Friends</h4>
        <ul className="sidebarFriendList">
          {friends?.map((user) => (
            <CloseFriend key={user._id} user={user} />
          ))}
        </ul>
        <button className="sidebarButton">Show More</button>
      </div>
    </div>
  );
}
