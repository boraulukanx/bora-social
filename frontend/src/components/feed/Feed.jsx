import React, { useState, useEffect, useMemo, useContext } from "react";
import "./feed.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import axios from "axios";
import UserCard from "../../components/userCard/UserCard";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

import Pin from "./pin";

export default function Feed(user) {
  const token =
    "pk.eyJ1IjoiYm9yYXVsdWthbiIsImEiOiJjbGNneHp3ejMwdmpsM29xaGJlbzRxMndhIn0.dtiTt6bdbF3y8hOFT6mgTg";

  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);

  const { user: currentUser, dispatch } = useContext(AuthContext);
  /*  const [currentLat, setCurrentLat] = useState(0);
  const [currentLng, setCurrentLng] = useState(0); */

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLat(position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setLng(position.coords.longitude);
    });

    async function getData() {
      try {
        const res = await axios.get("http://localhost:3001/auth/getUsers");
        console.log(res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setUsers(data.map((option) => option));
    }
  }, [data]);

  /*   const getCurrentLocation = useEffect(() => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      setCurrentLat(position.coords.latitude);
      setCurrentLng(position.coords.longitude);
      try {
        await axios.put("http://localhost:3001/users/" + currentUser._id, {
          userId: currentUser._id,
          locationLAT: currentLat,
          locationLNG: currentLng,
        });
      } catch (error) {
        console.error(error);
      }
    });
    console.log(getCurrentLocation);
  }); */

  const [selectedUser, setSelectedUser] = useState(null);

  const pins = useMemo(
    () =>
      users?.map((user, index) => (
        <Marker
          key={user._id}
          longitude={user.locationLNG}
          latitude={user.locationLAT}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setSelectedUser(user);
            console.log(user._id);
          }}
        >
          <Pin />
        </Marker>
      )),
    [users]
  );

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Map
          mapboxAccessToken={token}
          style={{
            width: "1000px",
            height: "800px",
            borderRadius: "25px",
            border: "2px solid red",
            zoom: 1,
          }}
          initialViewState={{
            longitude: currentUser.locationLNG,
            latitude: currentUser.locationLAT,
            zoom: 7,
          }}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        >
          <NavigationControl position="bottom-right" />
          <FullscreenControl />
          <GeolocateControl />
          {pins}

          {selectedUser && (
            <Popup
              anchor="top"
              longitude={selectedUser?.locationLNG}
              latitude={selectedUser?.locationLAT}
              onClose={() => setSelectedUser(null)}
            >
              <div className="PopUp">
                <img
                  className="img"
                  src={`http://localhost:3001/images${selectedUser?.profilePicture}`}
                />
                <p>{selectedUser?.username}</p>
                <p>{selectedUser?.email}</p>
              </div>
              {/* <img width="100%" src={selectedUser?.image} /> */}
            </Popup>
          )}
        </Map>
      </div>
      <div className="feedRight">
        <h1>People Around You</h1>
        <div className="feedRight-Container">
          {users?.map((user) => (
            <UserCard key={user._id} user={user}></UserCard>
          ))}
        </div>
      </div>
    </div>
  );
}
