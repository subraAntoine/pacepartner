import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Hero from "./Pages/Hero/Hero"
import Auth from "./Pages/Auth/Auth"

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
              <Route path="/auth" element={<Auth />} />

          </Routes>
      </Router>
    </div>
  );
}

export default App;
