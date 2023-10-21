import "./CoverLetter.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CoverLetter(props) {
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(false);

  console.log('from coverletter: ', props.jwt);

  const CoverletterMain = () =>{
  const [fname, setFname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");
  const [JobPosition, setJobpostion] = useState("");
  const [companyName, setCompanyname] = useState("");
  const [HrName, setHrName] = useState("");
  const [date, setDate] = useState("");
  const [education, setEducation] = useState("");
  const [pastcompany, setPastcompany] = useState("");
  const history = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    const cover = {
      fullName: fname,
      Address: address,
      PhoneNumber: phone.replace(' ', ''),
      Email: email,
      Education: education,
      Pastcompany: pastcompany,
      Experience: experience,
      JobPosition: JobPosition,
      CompanyName: companyName,
      HRName: HrName,
      Date: date,
    };

    console.log(cover);
    const response = await fetch(`${props.url}coverletter/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "Authorization": `Bearer ${props.jwt}` },
      body: JSON.stringify(cover),
    });

    const data = await response.json();

    console.log(data.errors);
    if(data.errors){
      setError(data.errors);
    } else if(data.error){
      setError(data.error);
    } else {
      const { _id } = data.coverletter;
      setisLoading(false);
      history(`/coverletter/${_id}`, {state: {url : `${props.url}coverletter/${_id}`}});
    }
    console.log(error);
    setisLoading(false);
  }; 
    return (<div className="container">
  <h1 className="CoverletterHeader"> Personal information:</h1>
  <form>
    <form className="form1">
      <label for="fullName">Full name:</label>
      <br />
      <input
        required
        type="text"
        id="fname"
        name="fname"
        value={fname}
        onChange={(e) => {
          setFname(e.target.value);
        }}
      />
      <br />
      <label for="address">Address: </label>
      <br />
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <br />
      <label for="phone">Phone number: </label>
      <br />
      <input
        required
        type="text"
        id="phone"
        name="phone"
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value);
        }}
      />
      <br />
      <label for="email">Email: </label>
      <br />
      <input
        required
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label for="experience">Years of experience </label>
      <br />
      <input
        id="experience"
        value={experience}
        name="experience"
        onChange={(e) => {
          setExperience(e.target.value);
        }}
      />

      <br />
      <label for="education">Education </label>
      <br />
      <input
        id="education"
        value={education}
        name="education"
        onChange={(e) => {
          setEducation(e.target.value);
        }}
      />
      <br />
    </form>
    <h1 className="CoverletterHeader"> Job Information:</h1>
    <form className="form2">
      <label for="jobPostion">Job Postion</label>
      <br />
      <input
        id="jobPostion"
        name="jobpostion"
        value={JobPosition}
        onChange={(e) => {
          setJobpostion(e.target.value);
        }}
      />
      <br />
      <label for="companyName">Company's Name</label>
      <br />
      <input
        id="companyName"
        name="companyName"
        value={companyName}
        onChange={(e) => {
          setCompanyname(e.target.value);
        }}
      />
      <br />
      <label for="pastcompany">Current Company</label>
      <br />
      <input
        id="pastcompany"
        name="pastcompany"
        value={pastcompany}
        onChange={(e) => {
          setPastcompany(e.target.value);
        }}
      />
      <br />
      <label for="HrName">HR's Name</label>
      <br />
      <input
        id="HrName"
        name="HrName"
        value={HrName}
        onChange={(e) => {
          setHrName(e.target.value);
        }}
      />
      <br />
      <label for="date">Date of Application</label>
      <br />
      <input
        type="date"
        id="date"
        value={date}
        name="date"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <br />
    </form>
    <input type="button" value="Submit" onClick={handleClick} />
  </form>
</div>);}

  return (
    <>
    {!isLoading && !error && props.loggedin && <CoverletterMain url={props.url} jwt={props.jwt}/>}
    {!isLoading && !error && !props.loggedin && <div className="resume"> 
                     <p className="mustlogin">
                         You must be logged in in order to create a cover letter.
                     </p>
                 </div>}
    {!isLoading && error && Array.isArray(error) && <div className="errors">
        {error.map((err) => {console.log(err.message);return ((err.message !== '') && <>
        <p class="error">{err.message}</p><br/>
        </>);})}
        <button onClick={() => {
          setError(false);
        }} className="goback">Go back</button>
        </div>}
        {error && !Array.isArray(error) && (error !== '') &&
        <div className="errors">
        <p class="error">{error}</p>
        <button onClick={() => {
          setError(false);
        }} className="goback">Go back</button>
        </div>}
    </>
  );
}

export default CoverLetter;
