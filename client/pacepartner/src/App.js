import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Hero from "./Pages/Hero/Hero"

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
