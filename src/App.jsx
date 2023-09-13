import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Navbar from "./components/Navbar";
import axios from "axios";
import Tracks from "./components/Tracks";
import Artists from "./components/Artists";
import { SERVER_URI } from "../utils/URI";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
  const [expires, setExpires] = useState();
  const [user, setUser] = useState({});

  function getUser(refresh_token) {
    axios
      .get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + cookies.access_token,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => {
        const error = err.response.data.error;
        console.log(error);
        if (
          error.message == "The access token expired" &&
          error.status == 401
        ) {
          setCookie("isExpired", true);
        }
      });
  }

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const token = query.get("access_token");
    const expiration = query.get("expiration");
    const refresh_token = query.get("refresh_token");

    if (expiration != null && refresh_token != null) {
      setCookie("expires_in", expiration);
      setCookie("refresh_token", refresh_token);
    }
    // const isExpired = cookies.expires_in < new Date();

    if (token !== null && !cookies.isExpired) {
      setCookie("access_token", token);
    } else if (cookies.isExpired) {
      console.log("HELLO");
      axios
        .get(
          `${SERVER_URI}/refresh_token?refresh_token=${cookies.refresh_token}`
        )
        .then((res) => {
          console.log("REFRESH_TOKEN ON : ", res.data);
          setCookie("access_token", res.data.access_token);
          setCookie("isExpired", false);
          setCookie("expires_in", res.data.expires_in);
          window.reload();
        })
        .catch((err) => console.log(err));
    } else if (token == null && cookies.access_token) {
      setCookie("access_token", cookies.access_token);
    } else {
      removeCookie("access_token");
    }
    getUser(refresh_token);
  }, []);

  return (
    <section className="">
      <Navbar user={user} />

      <Routes>
        <Route
          element={<Artists access_token={cookies.access_token} />}
          path="/artists"
        />
        <Route
          element={<Tracks access_token={cookies.access_token} />}
          path="/tracks"
        />
        <Route
          element={<Home access_token={cookies.access_token} />}
          path="/"
        />
      </Routes>
    </section>
  );
}
