import "./Resume.css";
import Jobs from "../../Jobs/Jobs";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";

function Resume(props) {
  const [error, setError] = useState();
  const [isLoading, setisLoading] = useState(false);

  function ResumeMain(props) {
  const [fname, setFname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [personalImg, setPersonalImg] = useState("");

  const [objective, setObjective] = useState("");
  const [jobsNum, setJobsNum] = useState(0);
  const [jobsTitle, setjobsTitle] = useState(new Array(jobsNum));
  const [company, setCompany] = useState(new Array(jobsNum));
  const [employmentDate, setEmploymentDate] = useState(new Array(jobsNum));
  const [companyLoc, setCompanyLoc] = useState(new Array(jobsNum));
  const [companyDescription, setCompanyDescription] = useState(
    new Array(jobsNum)
  );
  const [responsibilities, setResponsibilities] = useState(new Array(jobsNum));

  const [bachelorCheck, setBachelorCheck] = useState(false);
  const [bachelor, setBachelor] = useState("");
  const [bachelorInstitution, setBachelorInstitution] = useState("");
  const [bachelorLoc, setBachelorLoc] = useState("");
  const [bachelorGradDate, setBachelorGradDate] = useState("");
  const [bachelorAwards, setBachelorAwards] = useState("");

  const [masterCheck, setMasterCheck] = useState(false);
  const [master, setMaster] = useState("");
  const [masterInstitution, setMasterInstitution] = useState("");
  const [masterLoc, setMasterLoc] = useState("");
  const [masterGradDate, setMasterGradDate] = useState("");
  const [masterAwards, setMasterAwards] = useState("");

  const [phdCheck, setPhdCheck] = useState(false);
  const [phd, setPhd] = useState("");
  const [phdInstitution, setPhdInstitution] = useState("");
  const [phdLoc, setPhdLoc] = useState("");
  const [phdGradDate, setPhdGradDate] = useState("");
  const [phdAwards, setPhdAwards] = useState("");

  const [skills, setSkills] = useState("");

  const [hobbies, setHobbies] = useState("");

  const [volunteer, setVolunteer] = useState(" ");

  

  const history = useNavigate();

  
  const handleClick = async (e) => {
    setisLoading(true);
    e.preventDefault();
      
    

    let res = {
      full_name: fname,
      address: address,
      phone: phone.replace(' ', ''),
      email: email,
      linkedin: linkedin,
      portfolio: portfolio,
      personalImg: personalImg,
      objective: objective,
      skills: skills,
      hobbies: hobbies,
      volunteer: volunteer,
      jobsNum: jobsNum,
      bachelorCheck: bachelorCheck,
      masterCheck: masterCheck,
      phdCheck: phdCheck
    };


    if(jobsNum > 0) {
      res = {...res, jobsTitle: jobsTitle,
        company: company,
        employmentDate: employmentDate,
        companyLoc: companyLoc,
        companyDescription: companyDescription,
        responsibilities: responsibilities };
    }

    if(bachelorCheck) {
      res = {...res, bachelor: bachelor,
        bachelorInstitution: bachelorInstitution,
        bachelorLoc: bachelorLoc,
        bachelorGradDate: bachelorGradDate,
        bachelorAwards: bachelorAwards}
    }

    if(masterCheck) {
      res = {...res, master: master,
        masterInstitution: masterInstitution,
        masterLoc: masterLoc,
        masterGradDate: masterGradDate,
        masterAwards: masterAwards}
    }

    if(phdCheck) {
      res = {...res, phd: phd,
        phdInstitution: phdInstitution,
        phdLoc: phdLoc,
        phdGradDate: phdGradDate,
        phdAwards: phdAwards}
    }
    
    const response = await fetch(`${props.url}resume/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
                 "Authorization": `Bearer ${props.jwt}` },
      body: JSON.stringify(res),
    });

    const data = await response.json();
    if(data.errors){
      setError(data.errors);
      console.log(data.errors);
    } else if(data.error){
      setError(data.error);
    } else {
      const { _id } = data.resume;
      setisLoading(false);
      history(`/resume/${_id}`, {state: {url : `${props.url}resume/${_id}`}});
    }
    setisLoading(false);
  }; 
    return (<div className="resume">
  <div className="form">
    <form>
      <h1>Personal information:</h1>
      <label for="fname">Full name: </label>
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
        required
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
        type="text"
        id="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <label for="linkedin">Linkedin Profile (If available): </label>
      <br />
      <input
        type="text"
        id="linkedin"
        name="linkedin"
        value={linkedin}
        onChange={(e) => {
          setLinkedin(e.target.value);
        }}
      />
      <br />
      <label for="portfolio">Website or Portfolio (If available): </label>
      <br />
      <input
        type="text"
        id="portfolio"
        name="portfolio"
        value={portfolio}
        onChange={(e) => {
          setPortfolio(e.target.value);
        }}
      />
      <br />
      <label for="image">Personal image: </label>
      <input
        type="file"
        id="image"
        onChange={(e) => {
          let file = e.target.files[0];
          let reader = new FileReader();
          reader.onload = (e) => {
            setPersonalImg(e.target.result);
          };

          if (file) {
            reader.readAsDataURL(file);
          }
        }}
      />
      <br />
      <h1>Job objective : </h1>
      <input
        placeholder="A specific job title that you are targeting"
        value={objective}
        onChange={(e) => {
          setObjective(e.target.value);
        }}
      />
      <h1>Work experience (If available): </h1>
      <label for="jobsNum">Number of previous jobs: </label>
      <input
        type="text"
        id="jobsNum"
        name="jobsNum"
        onChange={(e) => {
          try {
            if (Number(e.target.value) >= 0) {
              setJobsNum(Number(e.target.value));
            }
          } catch {}
        }}
      />
      <Jobs
        jobsNum={jobsNum}
        jobsTitle={jobsTitle}
        setjobsTitle={setjobsTitle}
        company={company}
        setCompany={setCompany}
        employmentDate={employmentDate}
        setEmploymentDate={setEmploymentDate}
        companyLoc={companyLoc}
        setCompanyLoc={setCompanyLoc}
        companyDescription={companyDescription}
        setDescription={setCompanyDescription}
        responsibilities={responsibilities}
        setResponsibilities={setResponsibilities}
      />
      <h1>Education: </h1>
      <input
        type="checkbox"
        id="bachelorCheck"
        name="bachelorCheck"
        checked={bachelorCheck}
        onChange={(e) => {
          setBachelorCheck(e.target.checked);
        }}
      />
      <label for="bachelorCheck"> Bachelor's degree</label>
      <br />
      <input
        type="checkbox"
        id="masterCheck"
        name="masterCheck"
        checked={masterCheck}
        onChange={(e) => {
          setMasterCheck(e.target.checked);
        }}
      />
      <label for="masterCheck"> Master's degree</label>
      <br />
      <input
        type="checkbox"
        id="phdCheck"
        name="phdCheck"
        checked={phdCheck}
        onChange={(e) => {
          setPhdCheck(e.target.checked);
        }}
      />
      <label for="bachelorCheck"> PhD degree</label>
      <br />
      {bachelorCheck && (
        <>
          <label required for="bachelor">
            Bachelor's degree:{" "}
          </label>
          <br />
          <input
            type="text"
            id="bachelor"
            name="bachelor"
            placeholder="Write the field of study"
            value={bachelor}
            onChange={(e) => {
              setBachelor(e.target.value);
            }}
          />
          <br />
          <label required for="bachelorInstitution">
            Institution:{" "}
          </label>
          <br />
          <input
            type="text"
            id="bachelorInstitution"
            name="bachelorInstitution"
            value={bachelorInstitution}
            onChange={(e) => {
              setBachelorInstitution(e.target.value);
            }}
          />
          <br />
          <label required for="bachelorLoc">
            Location:{" "}
          </label>
          <br />
          <input
            type="text"
            id="bachelorLoc"
            name="bachelorLoc"
            value={bachelorLoc}
            onChange={(e) => {
              setBachelorLoc(e.target.value);
            }}
          />
          <br />
          <label required for="bachelorGradDate">
            Graduation date:{" "}
          </label>
          <br />
          <input
            type="date"
            id="bachelorGradDate"
            name="bachelorGradDate"
            value={bachelorGradDate}
            onChange={(e) => {
              setBachelorGradDate(e.target.value);
            }}
          />
          <br />
          <label>Academic honors or awards (optional): </label>
          <br />
          <text>
            <textarea
              placeholder="List the awards that where acquired during this period"
              value={bachelorAwards}
              onChange={(e) => {
                setBachelorAwards(e.target.value);
              }}
            />
          </text>
          <br />
        </>
      )}
      {masterCheck && (
        <>
          <label required for="master">
            Master's degree:{" "}
          </label>
          <br />
          <input
            type="text"
            id="master"
            name="master"
            placeholder="Write the field of study"
            value={master}
            onChange={(e) => {
              setMaster(e.target.value);
            }}
          />
          <br />
          <label required for="masterInstitution">
            Institution:{" "}
          </label>
          <br />
          <input
            type="text"
            id="masterInstitution"
            name="masterInstitution"
            value={masterInstitution}
            onChange={(e) => {
              setMasterInstitution(e.target.value);
            }}
          />
          <br />
          <label required for="masterLoc">
            Location:{" "}
          </label>
          <br />
          <input
            type="text"
            id="masterLoc"
            name="masterLoc"
            value={masterLoc}
            onChange={(e) => {
              setMasterLoc(e.target.value);
            }}
          />
          <br />
          <label required for="masterGradDate">
            Graduation date:{" "}
          </label>
          <br />
          <input
            type="date"
            id="masterGradDate"
            name="masterGradDate"
            value={masterGradDate}
            onChange={(e) => {
              setMasterGradDate(e.target.value);
            }}
          />
          <br />
          <label>Academic honors or awards (optional): </label>
          <br />
          <text>
            <textarea
              placeholder="List the awards that where acquired during this period"
              value={masterAwards}
              onChange={(e) => {
                setMasterAwards(e.target.value);
              }}
            />
          </text>
          <br />
        </>
      )}
      {phdCheck && (
        <>
          <label required for="phd">
            PhD degree:{" "}
          </label>
          <br />
          <input
            type="text"
            id="phd"
            name="phd"
            placeholder="Write the field of study"
            value={phd}
            onChange={(e) => {
              setPhd(e.target.value);
            }}
          />
          <br />
          <label required for="phdInstitution">
            Institution:{" "}
          </label>
          <br />
          <input
            type="text"
            id="phdInstitution"
            name="phdInstitution"
            value={phdInstitution}
            onChange={(e) => {
              setPhdInstitution(e.target.value);
            }}
          />
          <br />
          <label required for="phdLoc">
            Location:{" "}
          </label>
          <br />
          <input
            type="text"
            id="phdLoc"
            name="phdLoc"
            value={phdLoc}
            onChange={(e) => {
              setPhdLoc(e.target.value);
            }}
          />
          <br />
          <label required for="phdGradDate">
            Graduation date:{" "}
          </label>
          <br />
          <input
            type="date"
            id="phdGradDate"
            name="phdGradDate"
            value={phdGradDate}
            onChange={(e) => {
              setPhdGradDate(e.target.value);
            }}
          />
          <br />
          <label>Academic honors or awards (optional): </label>
          <br />
          <text>
            <textarea
              placeholder="List the awards that where acquired during this period"
              value={phdAwards}
              onChange={(e) => {
                setPhdAwards(e.target.value);
              }}
            />
          </text>
          <br />
        </>
      )}
      <h1>Skills :</h1>
      <text>
        <textarea
          placeholder="Relevant skills, both technical and soft skills (e.g., programming languages,communication skills)."
          value={skills}
          onChange={(e) => {
            setSkills(e.target.value);
          }}
        />
      </text>
      <h1>Volunteer experiences :</h1>
      <text>
        <textarea
          placeholder="Similar to work experience, including organization names, dates, responsibilities, andachievements."
          value={volunteer}
          onChange={(e) => {
            setVolunteer(e.target.value);
          }}
        />
      </text>
      <h1>Hobbies and intrests :</h1>
      <text>
        <textarea
          placeholder="Optional section to provide insights into the user's personality and interests outsideof work."
          value={hobbies}
          onChange={(e) => {
            setHobbies(e.target.value);
          }}
        />
      </text>
      <br />
      <input type="button" value="Submit" onClick={handleClick} />
    </form>
  </div>
</div>);}
 
  return (
    <>
        {!isLoading && !error && props.loggedin && <ResumeMain url={props.url} jwt={props.jwt}/>}
        {!isLoading &&!error && !props.loggedin && 
                 <div className="resume"> 
                     <p className="mustlogin">
                         You must be logged in in order to create a resume
                     </p>
                 </div>}
        {!isLoading &&error && Array.isArray(error) && <div className="errors">
        {
        error.map((err) => ((err.message !== '') && <>
        <p class="error">{err.message}</p><br/>
        </>))
        }
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

export default Resume;
