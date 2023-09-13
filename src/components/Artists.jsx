import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { SERVER_URI } from "../../utils/URI";
import Loader from "../assets/Loader/Loader";
export default function Artists({ access_token }) {
  const [artists, setArtists] = useState([]);
  const [term, setTerm] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Top Artists - SFS";
  }, []);

  useEffect(() => {
    let time_range =
      term === 0
        ? "short_term"
        : term === 1
        ? "medium_term"
        : term === 2
        ? "long_term"
        : "short_term";
    setLoading(true);
    axios
      .post(SERVER_URI + "/artists?time_range=" + time_range, { access_token })
      .then((res) => {
        console.log(res.data.data);
        setArtists(res.data.data.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [term]);

  return (
    <div className="px-10 pb-10 flex flex-col items-center justify-center text-center min-w-full">
      <h1 className="text-center text-5xl mt-10 font-black white uppercase">
        My top artists
      </h1>

      <div className="grid lg:grid-cols-3 sm:grid-cols-1 px-5 my-10 w-full">
        <button
          className={`terms text-xl mx-5 my-5 border uppercase px-6 py-3 ${
            term === 0 ? "active" : ""
          }`}
          onClick={() => setTerm(0)}
        >
          last 4 weeks
        </button>
        <button
          className={`terms text-xl mx-5 my-5 border uppercase px-6 py-3 ${
            term === 1 ? "active" : ""
          }`}
          onClick={() => setTerm(1)}
        >
          last 6 months
        </button>
        <button
          className={`terms text-xl mx-5 my-5 border uppercase px-6 py-3 ${
            term === 2 ? "active" : ""
          }`}
          onClick={() => setTerm(2)}
        >
          all time
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="cards w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-10">
          {artists.map((e, i) => {
            return (
              <div
                className="w-full card flex flex-col items-center justify-center"
                key={i}
              >
                <a
                  href={e.external_urls?.spotify}
                  className="name text-xl font-bold black my-5 mx-5 text-center"
                  target={"_blank"}
                >
                  <img
                    src={e.images[0]?.url}
                    alt={e?.name + "Photo"}
                    className="cover"
                    width={250}
                    style={{ height: "250px" }}
                  />
                </a>
                <a
                  href={e.external_urls?.spotify}
                  className="name text-3xl font-black uppercase white text-shadow  my-5 mx-5 text-center"
                  target={"_blank"}
                >
                  {e?.name}
                </a>

                <h3 className="capitalize font-bold">Genres : {e.genres[0]}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
