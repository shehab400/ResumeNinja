import { useLocation } from "react-router-dom";
import { useRef } from "react";
import useFetchResumes from "../../hooks/useFetchResumes";
import "./CurrentResume.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function CurrentResume(props) {
  const location = useLocation();
  const url = location.state.url;
  console.log(url);
  const { resumes, isPending, error } = useFetchResumes(url , props.jwt);
  const pdfRef = useRef();
  console.log('Inside CurrentResume');
  console.log(resumes);
  console.log(error);

  const Resume = (props) => (
    <div ref={pdfRef}>
      <div className="header">
        <div className="Img">
          <img
            src={
              resumes.resume.personalImg === ""
                ? "../../assets/nobody.jpeg"
                : resumes.resume.personalImg
            }
          />
        </div>
        <div className="personal">
          <div className="name">
            <h1>{resumes.resume.full_name}</h1>
          </div>
          <div className="jobTitle">
            <h4>{resumes.resume.objective}</h4>
          </div>
        </div>
        <div className="contact">
          <h1>Contact</h1>
          <p>{resumes.resume.address}</p>
          <p>{resumes.resume.phone}</p>
          <p>{resumes.resume.email}</p>
          <p>{resumes.resume.linkedin}</p>
          <p>{resumes.resume.portfolio}</p>
        </div>
      </div>
      <hr />
      <div className="main">
        <div className="education">
          {resumes.resume.bachelorCheck && (
            <>
              <h1>Education </h1>
              <p> Bachelor's degree in {resumes.resume.bachelor}</p>
              <p>
                {resumes.resume.bachelorInstitution}, {resumes.resume.bachelorLoc}
              </p>
              <p>{resumes.resume.bachelorGradDate}</p>
              <p>Awards and honors</p>
              <p>{resumes.resume.bachelorAwards}</p>
            </>
          )}
          <br />
          {resumes.resume.masterCheck && (
            <>
              <h1> Master's degree in {resumes.resume.master}</h1>
              <p>
                {resumes.resume.masterInstitution}, {resumes.resume.masterLoc}
              </p>
              <p>{resumes.resume.masterGradDate}</p>
              <p>Awards and honors</p>
              <p>{resumes.resume.masterAwards}</p>
            </>
          )}
          <br />
          {resumes.resume.phdCheck && (
            <>
              <h1> PhD degree in {resumes.resume.phd}</h1>
              <p>
                {resumes.resume.phdInstitution}, {resumes.resume.phdLoc}
              </p>
              <p>{resumes.resume.phdGradDate}</p>
              <p>Awards and honors</p>
              <p>{resumes.resume.phdAwards}</p>
            </>
          )}
          <br />
        </div>

        <div className="professionalExperience">
          <h1>Professional Experience</h1>
          <ul>
            {Array.from({ length: resumes.resume.jobsNum }, (value, index) => (
              <li>
                <p>
                  Worked at {resumes.resume.company[index]},{" "}
                  {resumes.resume.companyLoc[index]}
                </p>
                <p>Company Description: {resumes.resume.companyDescription[index]}</p>
                <p>Worked as {resumes.resume.jobTitle[index]}</p>
                <p>Responsibilities: {resumes.resume.responsibilities}</p>
                <p>Employment Date: {resumes.resume.employmentDate[index]}/</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="skills">
          {resumes.resume.skills && (
            <>
              <h1>Skills</h1>
              <p>{resumes.resume.skills}</p>
            </>
          )}
        </div>

        <div className="volunteer">
          {resumes.resume.volunteer && (
            <>
              <h1>Volunteering experience</h1>
              <p>{resumes.resume.volunteer}</p>
            </>
          )}
        </div>

        <div className="hobbies">
          {resumes.resume.hobbies && (
            <>
              <h1>Hobbies</h1>
              <p>{resumes.resume.hobbies}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  function handleClick() {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      console.log(imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${resumes.resume.full_name}.pdf`);
    });
  }

  return (
    <>
      {isPending && <div>Loading resumes ...</div>}
      {error && <div>Experienced an error: {error}</div>}
      {resumes && <Resume />}
      <button onClick={handleClick}>Download</button>
    </>
  );
}

export default CurrentResume;
