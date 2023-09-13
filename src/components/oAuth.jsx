import axios from "axios";
import { SERVER_URI } from "../../utils/URI";

export default function OAuth() {
  async function Login(event) {
    event.preventDefault();
    window.open(SERVER_URI + "/oAuth", "_self");
  }

  return (
    <button
      onClick={(e) => Login(e)}
      className="bg-green-500 text-green-100 block py-2 px-8 rounded-full"
    >
      Sign in with spotify
    </button>
  );
}
