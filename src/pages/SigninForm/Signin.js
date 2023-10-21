import "./signin.css";
import React, { useState } from "react";
import logo from "../../assets/default.png";
import { useNavigate } from "react-router-dom";


function Signin(props) {
  
  const [form2, setform2] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Form1 = () => {
    const [email , setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    return (
    <div className="signinparent">
      <div className="shadow signinform ">
        {error && Array.isArray(error) && error.map((err) => (<>{(err.message !== '') && <p class="error">{err.message}</p>}</>))}
        {error && !Array.isArray(error) && (error !== '')  && <p class="error">{error}</p>}
        <h1 className="signheader">Sign in</h1>
        <form action="#">
          <label for="user_name" className="user_name label">
            Email
          </label>
          <br />
          <input
            type="text"
            className="usernameinput input"
            name="user_name"
            placeholder="username"
            onChange={(e) => {setEmail(e.target.value);}}
          />
          <br />
          <label for="user_password" className="user_password label ">
            Password
          </label>
          <br />
          <input
            type="password"
            className="userpassinput input"
            name="user_password"
            placeholder="password"
            onChange={(e) => {setPasswd(e.target.value);}}
          />
          <br />
          <button className="button" onClick={async () => {
            console.log('clicked');
            setIsLoading(true);
            const res = await fetch(props.url + 'auth/login', {
              method : 'POST',
              headers: {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                email : email,
                password : passwd
              })
            });

            const body = await res.json();
            if(body.error){
              if(body.error.message){
                setError(body.error.message);
              }else{
               setError(body.error);
              }
              setEmail('');
              setPasswd('');
              setIsLoading(false);
              console.log(error)
            }else{
              setEmail('');
              setPasswd('');
              props.setJwt(body.token);
              console.log('From signin: ',body.token);
              let response = await fetch(props.url + 'auth/me', {
                method : 'POST',
                headers: {
                  "Content-Type" : "application/json",
                  "Authorization" : `Bearer ${body.token}`
                }
              });
              let user = await response.json();
              if(user.error){
                setError(user.error);
                setIsLoading(false);
              }else{
                console.log(user);
                props.setLoggedin(true);
                props.setCurrentUser({username : user.user.username, email: user.user.email});
                setIsLoading(false);
                navigate('/', {state: {username: user.user.username, password: user.user.password}});
              }
            }


          }}>Submit</button>

          <button onClick={() => setform2(true)} className="btn" href="#">
            Create an Account
          </button>
        </form>
      </div>
      <img className="signinlogo" src={logo} />
    </div>
  );
  }
  const Form2 = () => {
    const [username , setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [newPasswd, setNewPasswd] = useState('');
    const [confirmNewPasswd, setConfirmNewPasswd] = useState('');
    

    return (
    <div className="signinparent">
      <div className="shadow signinform " id="shadow">
      {error && Array.isArray(error) && error.map((err) => (<>{(err.message !== '') && <p class="error">{err.message}</p>}</>))}
      {error && !Array.isArray(error) && (error !== '') && <p class="error">{error}</p>}
        <h1 className="signheader">Sign up</h1>
        <form action="#">
          <label for="newusername" className="newusername label">
            Username
          </label>
          <br />
          <input
            type="text"
            className="newusernameinput input"
            name="newusername"
            placeholder="username"
            onChange={(e) => {setUsername(e.target.value)}}
          />
          <br />
          <label for="newemail" className="newemail label">
            Email
          </label>
          <br />
          <input
            type="text"
            className="newemailinput input"
            name="newemail"
            placeholder="Email"
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <br />
          <label for="newuserpassword" className="newuserpassword label ">
            Password
          </label>
          <br />
          <input
            type="password"
            className="userpassinput input"
            name="user_password"
            placeholder="password"
            onChange={(e) => {setNewPasswd(e.target.value)}}
          />
          <br />
          <label for="confirmpassword" className="confirmpassword label ">
            Confirm Password
          </label>
          <br />
          <input
            type="password"
            className="confirmpassword input"
            name="confirm-password"
            placeholder="Confirm password"
            onChange={(e) => {setConfirmNewPasswd(e.target.value)}}
          />
          <br />
          <button className="button" type="submit" onClick={async () => {
            setIsLoading(true);
            const res = await fetch(props.url + 'auth/signup', {
              method : 'POST',
              headers: {
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                username : username,
                email : email,
                password : newPasswd,
                confirmPassword : confirmNewPasswd
              })
            });

            const body = await res.json();
            console.log(body);
            if(body.error){
              console.log(body.error);
              if(body.error.message){
                setError(body.error.message);
              }else{
               setError(body.error);
              }
              setEmail('');
              setUsername('');
              setNewPasswd('');
              setConfirmNewPasswd('');
              setIsLoading(false);
                
            }else{
              setEmail('');
              setUsername('');
              setNewPasswd('');
              setConfirmNewPasswd('');
              setIsLoading(false); 
              alert('You have been signed up successfuly. Please login to start using your account.');
            }


          }}>
            Submit
          </button>
          <button
            className="btn signinbtn"
            id="signinbtn"
            href="#"
            onClick={() => setform2(false)}
          >
            Sign In
          </button>
        </form>
      </div>
      <img className="signinlogo" src={logo} />
    </div>
  );}

  return (
    <div>
      {isLoading && <div class="loading" >Loading...</div>}
      {!form2 && !isLoading && <Form1/>}
      {form2 && !isLoading && <Form2/>}
    </div>
  );
}

export default Signin;
