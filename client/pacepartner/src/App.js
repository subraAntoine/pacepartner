import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Hero from "./Pages/Hero/Hero";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Entrainement from "./Pages/Entrainement/Entrainement";
import Parametres from "./Pages/Parametres/Parametres";
import Communaute from "./Pages/Communaute/Communaute";
import Error from "./Pages/Error/Error";
import MailVerification from "./Pages/MailVerification/MailVerification";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />

          <Route path="/parametres" element={<Parametres />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route
            path="/entrainement/:type/:userId"
            element={<Entrainement />}
          />
          <Route path="/communaute" element={<Communaute />} />
          <Route path="/error" element={<Error />} />
          <Route
            path="/emailVerification/:emailToken"
            element={<MailVerification/>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
