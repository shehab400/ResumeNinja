import React from "react";
import "./ResumeList.css";
import Gallery from "../ResumeGallery/ResumeGallery";
import useFetchResumes from "../../hooks/useFetchResumes";


const ResumesList = (props) => {
  const {resumes , isPending, error} = useFetchResumes(props.url+'resume', props.jwt);
  console.log(props.currentUser);
  return (
    <>
    {isPending && <div>Loading resumes ...</div>}
    {error && <div>Experienced an error: {error}</div>}
    {resumes && 
    <div className="resumelistparent">
      <div className="resumelistheader">
        <h1 className="hello">Hello {props.currentUser.username}</h1>
        <h1>Checkout Your recent Resumes</h1>
      </div>
      <div className="resumecontainer">
        <Gallery myArray={resumes.resumes} url={props.url} jwt={props.jwt} />
      </div>
    </div>
    }
    </>
  );
};

export default ResumesList;
