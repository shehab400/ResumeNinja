import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar(props) {
  console.log(props.currentUser);
  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="logo">ResumeNinja.</h1>
      </Link>
      <div className="navbarOptions">
        <Link to="/">Home</Link>
        <Link to="/resume">Resume</Link>
        <Link to="/coverletter">Cover Letter</Link>
        {props.loggedin && <Link to="/resumes" >My resumes</Link>}
        {props.loggedin && <Link to="/coverletters" >My cover letters</Link>}
        <Link to="/about">About</Link>
        {!props.loggedin && <Link to="/signin">Sign In</Link>}
        {props.loggedin && <Link className="profile">{props.currentUser.username}</Link>}
      </div>
    </div>
  );
}

export default NavBar;
