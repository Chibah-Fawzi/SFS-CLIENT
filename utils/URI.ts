let SERVER_URI: string;

if (import.meta.env.DEV) {
  SERVER_URI = import.meta.env.VITE_LOCAL_SERVER_URI;
} else {
  SERVER_URI = import.meta.env.VITE_PROD_SERVER_URI;
}

let CLIENT_URI: string;

if (import.meta.env.DEV) {
  CLIENT_URI = import.meta.env.VITE_LOCAL_CLIENT_URI;
} else {
  CLIENT_URI = import.meta.env.VITE_PROD_CLIENT_URI;
}

export { SERVER_URI, CLIENT_URI };
