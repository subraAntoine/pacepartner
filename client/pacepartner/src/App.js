import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Hero from "./Pages/Hero/Hero"
import Auth from "./Pages/Auth/Auth"
import Home from "./Pages/Home/Home";


function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/home" element={<Home />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
