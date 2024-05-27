import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Home />
      <Outlet />
    </div>
  );
}

export default App;
