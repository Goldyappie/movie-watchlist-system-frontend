import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";

function App() {
  const [page, setPage] = useState(() => {
    const token = localStorage.getItem("token");

    if (token) {
      return "movies";
    }

    return "register";
  });

  return (
    <>
      {page === "register" && <Register setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "movies" && <Movies setPage={setPage} />}
    </>
  );
}

export default App;