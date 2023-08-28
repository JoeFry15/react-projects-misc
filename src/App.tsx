import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Reverser } from "./components/Reverser/Reverser";
import { Home } from "./components/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { Weather } from "./components/Weather/Weather";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="reverser" element={<Reverser />} />
          <Route path="weather" element={<Weather />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
