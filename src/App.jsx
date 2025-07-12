import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Authentication from "./Pages/Authentication/Authentication";
import Message from "./Pages/Message/Message";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getProfileAction(jwt));
    }
  }, [dispatch, jwt, auth.user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={auth.user ? <HomePage /> : <Authentication />}
        />
        <Route path="/message" element={<Message />} />
      </Routes>
    </Router>
  );
}

export default App;
