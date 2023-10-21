import { useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useFetchCover from "../../hooks/useFetchCover";
import "./CurrentCoverletter.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Rubik:ital@1&display=swap');
</style>;

const CurrentCoverletter = (props) => {
  const location = useLocation();
  const url = location.state.url;
  const { coverletters, isPending, error } = useFetchCover(url , props.jwt);
  console.log('Inside CurrentResume');
  console.log(coverletters);
  console.log(error);

  
  console.log('State: ', coverletters, isPending, error);

  const pdfRef = useRef();


  const CoverLetter = (props) => (
    <div className="parent" ref={pdfRef}>
      <header className="Header">
        <h2 className="Name">{coverletters.coverletter.fullName}</h2>
        <div className="uppersignature">
          <span>{coverletters.coverletter.PhoneNumber} |</span>
          <span>{coverletters.coverletter.Email} |</span>{" "}
          <span>{coverletters.coverletter.Address}</span>
          <br />
          <span>{coverletters.coverletter.Date}</span> <br />
          <span>{coverletters.coverletter.CompanyName}</span>
        </div>
      </header>

      <div className="salut">
        <h2>Dear {coverletters.coverletter.HRName}</h2>
      </div>

      <div className="ph1">
        My name is {coverletters.coverletter.fullName} , and I am an enthusiastic and
        results-driven professional interested in applying for{" "}
        {coverletters.coverletter.JobPosition} position with {coverletters.coverletter.CompanyName}. As a{" "}
        {coverletters.coverletter.JobPosition} with over {coverletters.coverletter.Experience} of
        industry experience in both freelance and full-time positions, I'm
        familiar with creating and maintaining websites and applications for a
        variety of clients, and I feel confident I can make positive
        contributions to your company. I'm excited about the opportunity to
        apply for a position with a larger organization that devotes time and
        resources to its team's professional training and development
      </div>
      <div className="ph2">
        I've always been interested in combining my passion for coding and
        knowledge of SEO content creation to develop sites that attract new
        users and boost company sales. In the last year, I increased site
        traffic for my current employer, {coverletters.coverletter.Pastcompany}, by 18% by
        identifying issues and debugging its site to provide clients with an
        easier and more enjoyable experience. I'm highly skilled in
        interpersonal communication and time management and possess a bachelor's
        degree in {coverletters.coverletter.Education}. My education provided me with the
        hands-on training and technical knowledge I use to be successful in my
        career.{" "}
      </div>

      <div className="ph3">
        As a positive and enthusiastic team member, I'm passionate about
        supporting my colleagues and am eager to learn from the experienced
        professionals at {coverletters.coverletter.CompanyName}. Thank you for considering
        me for the position and please feel free to contact me if you have
        questions about my application or want to discuss my credentials further
        . You can reach me by calling {coverletters.coverletter.PhoneNumber} or emailing{" "}
        {coverletters.coverletter.Email}.
      </div>

      <div className="signature">
        <h2>Sincerly,</h2>
        <br />
        <span>{coverletters.coverletter.fullName}</span>
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
      pdf.save(`${coverletters.coverletter.fullName}.pdf`);
    });
  }

  return (
    <>
      {isPending && <div>Loading resumes ...</div>}
      {error && <div>Experienced an error: {error}</div>}
      {coverletters && <CoverLetter />}
      <button className="button" onClick={handleClick}>
        Download
      </button>
    </>
  );
};

export default CurrentCoverletter;
