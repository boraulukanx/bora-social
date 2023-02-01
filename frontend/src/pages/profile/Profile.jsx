import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `http://localhost:3001/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const onSubmit = async () => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const user = {
        userId: user._id,
        profilePicture: user.profilePicture,
      };
      try {
        await axios.post("http://localhost:3001/api/upload");
        console.log(
          "successfully saved " + user.username + user.profilePicture
        );
      } catch (err) {
        console.log(err);
        console.log("catched an error");
      }
    };
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "/noAvatar.png"
                }
                alt=""
              />
            </div>
            <>
              <input
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />

              <button onClick={onSubmit}>Submit</button>
            </>

            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
