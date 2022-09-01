import { Route, Routes } from "react-router-dom";

import "./App.css";
import File from "./pages/File";

import Home from "./pages/Home";
import Things from "./pages/Things";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/file" element={<File />} />
      </Routes>
    </div>
  );
}

export default App;
