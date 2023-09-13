import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ user }) {
  const imageUrl = user?.images?.[0]?.url ? user?.images[0]?.url : "";
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <section>
      <nav className="flex items-center justify-between text-xl w-full px-5 py-3">
        <Link to={"/"}>
          <h3
            onClick={() => window.open("/", "_self")}
            className="nav-brand white font-black text-4xl tracking-widest"
          >
            SFS
          </h3>
        </Link>
        <div className="nav-items flex items-center justify-between">
          <Link to={"/artists"}>
            <h3 className="white font-bold uppercase mr-10">Top Artists</h3>
          </Link>
          <Link to={"/tracks"}>
            <h3 className="white font-bold uppercase">Top Tracks</h3>
          </Link>
        </div>

        {user != {} ? (
          <div
            className="flex items-center pr-5 justify-between image-container"
            // className={
            //   hovered
            //     ? "nav-user rounded-full pr-5 flex items-center justify-between image-container grad-purple-blue"
            //     : "flex items-center pr-5 justify-between image-container"
            // }
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={imageUrl}
              alt="User's spotify avatar"
              className="mr-3 rounded-full"
              style={{
                transform: hovered ? "translateX(0%)" : "translateX(100%)",
                transition: "transform 0.7s, opacity 0.7s",
              }}
            />
            <div
              className="purple "
              style={{
                transform: hovered ? "translateX(0%)" : "translateX(100%)",
                opacity: hovered ? 1 : 0,
                transition: "transform 0.7s, opacity 0.7s",
              }}
            >
              <h3 className="text-sm font-bold">{user?.display_name}</h3>
              <h6 className="text-xs dark">{user?.email}</h6>
            </div>
          </div>
        ) : (
          ""
        )}
      </nav>
    </section>
  );
}
