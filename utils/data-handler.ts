import axios from "axios";

export function getData(url: string, headers: any) {
  axios
    .get(url, { headers })
    .then((res) => res.data)
    .catch((err) => err);
}
