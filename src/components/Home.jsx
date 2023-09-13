import React from "react";
import OAuth from "./oAuth";

export default function Home({ access_token }) {
  return (
    <div className="flex flex-col justify-center items-center mt-10 ">
      {access_token ? (
        <>
          <h1 className="xl:text-8xl lg:text-5xl md:text-3xl sm:text-6xl uppercase font-bold text-center purple">
            Stats for spotify
          </h1>
          <h3 className="mt-10 white text-4xl font-bold">
            Get all your top tracks and artists from your spotify account
          </h3>
        </>
      ) : (
        <>
          <h1 className="xl:text-6xl lg:text-5xl md:text-3xl sm:text-6xl uppercase font-bold text-center purple">
            Stats for spotify
          </h1>
          <OAuth />
        </>
      )}
    </div>
  );
}
