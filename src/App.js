import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Home from "./pages/Home/Home";
import Resume from "./pages/Resume/Resume";
import CurrentResume from "./pages/CurrentResume/CurrentResume";
import CurrentCoverletter from "./pages/CurrentCoverletter/CurrentCoverletter";
import CoverLetter from "./pages/CoverLetter/CoverLetter";
import About from "./pages/About/About";
import ResumesList from "./pages/ResumeList/ResumeList";
import CoverlettersList from "./pages/CoverlettersList/CoverlettersList";
import "./App.css";
import Signin from "./pages/SigninForm/Signin";

// I used Routes instead of Switch becuase I am using react router v6

function App() {
   const [loggedin , setLoggedin] = useState(false);
   const [jwt, setJwt] = useState(null);
   const [currentUser , setCurrentUser] = useState({});
   const url = 'http://localhost:8080/'

   console.log('from app: ', jwt);
  return (
    <BrowserRouter>
      <header>
        <nav className="nav">
          <NavBar loggedin={loggedin} currentUser={currentUser} />
        </nav>
      </header>
      <main className="AppContent">
        <Routes>
          <Route exact path="/" element={<Home loggedin={loggedin} url={url} jwt={jwt} />} />
          <Route path="/resume" element={<Resume loggedin={loggedin} url={url} jwt={jwt} />} />
          <Route path="/resume/:id" element={<CurrentResume loggedin={loggedin} url={url} jwt={jwt} />} />
          <Route path="/resumes" element={<ResumesList loggedin={loggedin} url={url} jwt={jwt} currentUser={currentUser}/>} />
          <Route path="/coverletter" element={<CoverLetter loggedin={loggedin} url={url} jwt={jwt} />} />
          <Route path="/coverletter/:id" element={<CurrentCoverletter loggedin={loggedin} url={url} jwt={jwt}/>} />
          <Route path="/coverletters" element={<CoverlettersList loggedin={loggedin} url={url} jwt={jwt} currentUser={currentUser}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin setLoggedin={setLoggedin} url={url} setJwt={setJwt} setCurrentUser={setCurrentUser}/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
