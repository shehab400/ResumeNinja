import React from "react";
import "../ResumeList/ResumeList.css";
import Gallery from "../CoverletterGallery/CoverletterGallery";
import useFetchCover from "../../hooks/useFetchCover";


const CoverlettersList = (props) => {
  const {coverletters, isPending, error} = useFetchCover(props.url+'coverletter', props.jwt);
  return (
    <>
    {isPending && <div>Loading resumes ...</div>}
    {error && <div>Experienced an error: {error}</div>}
    {coverletters && 
    <div className="resumelistparent">
      <div className="resumelistheader">
        <h1 className="hello">Hello User</h1>
        <h1>Checkout Your recent CoverLetters</h1>
      </div>
      <div className="resumecontainer">
        <Gallery myArray={coverletters.coverletters} url={props.url} jwt={props.jwt}/>
      </div>
    </div>
    }
    </>
  );
};

export default CoverlettersList;
