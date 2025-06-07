import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ColorView from "./ColorView"
import FontsView from "./FontsView"
import LoginView  from "./LoginView";

import SignupView from "./SignupView";


import "./App.css";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/colors" element={<ColorView />} />
        <Route path="/fonts" element={<FontsView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/Signup" element={<SignupView />} />

        
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
