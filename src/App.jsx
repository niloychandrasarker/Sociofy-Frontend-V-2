import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Authentication from "./Pages/Authentication/Authentication";
import Message from "./Pages/Message/Message";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import WebSocketService from "./Config/websocket";
import { initializeWebSocketListeners } from "./Redux/Message/message.action";

function App() {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();

  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt && !auth.user) {
      dispatch(getProfileAction(jwt));
    }
    
    // Initialize WebSocket connection when user is authenticated
    if (auth.user && jwt) {
      WebSocketService.connect(auth.user.id);
      dispatch(initializeWebSocketListeners());
    }
    
    // Cleanup WebSocket on unmount
    return () => {
      WebSocketService.disconnect();
    };
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
