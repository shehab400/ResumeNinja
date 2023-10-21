import "./Home.css";
import resumeImg from "../../assets/resume.jpeg";
import covLetterImg from "../../assets/cover_letter.png";
import one from "../../assets/one.png";
import two from "../../assets/two.png";
import three from "../../assets/three.png";
import homeimage from "../../assets/home image.jpeg";
import homescreen from "../../assets/homescreen.jpeg";
import requiredform from "../../assets/requiredform.jpeg";
import downloadnow from "../../assets/downloadnow.jpeg";

function Home(props) {
  return (
    // <div className="home">
    //     <div className="introduction">
    //         <div className='intro'>The Best Resume Builder</div>
    //         <div className='introHeader'><h1>Create your resume now!</h1></div>
    //         <div className='introParagraph'>
    //             <p>
    //                 Resumeness allows you to create resumes and
    //                 cover letters with ease.
    //             </p>
    //         </div>
    //         <div class='resumeImg'><img src={resumeImg} alt='resume' /></div>
    //         <div class='CovLetterImg'><img src={covLetterImg} alt='cover letter' /></div>
    //     </div>
    //     <h1>Just three simple steps to download your resume ,or coverletter:</h1>
    //     <div className="howto">
    //         <div className='step1'>
    //             <div className='stepimg'><img src={one} alt='one'/></div>
    //             <p className='stepP'>
    //                 Choose whether you would like
    //                 to create a resume or a cover letter.
    //             </p>
    //             {/* <image className='stepillustration'/> */}
    //         </div>
    //         <div className='step2'>
    //             <div className='stepimg'><img src={two} alt='two'/></div>
    //             <p className='stepP'>
    //                 Fill the provided form.
    //             </p>
    //             {/* <image className='stepillustration'/> */}
    //         </div>
    //         <div className='step3'>
    //             <div className='stepimg'><img src={three} alt='three'/></div>
    //             <p className='stepP'>
    //                 Click on the submit button. The choosen service
    //                 will be available as a PDF fill for
    //                 downloading.
    //             </p>
    //             {/* <image className='stepillustration'/> */}
    //         </div>
    //     </div>
    // </div>
    <div className="parent">
      <div className="home">
        <div className="hometext">
          <div className="smalltext">THE BEST RESUME BUILDER</div>
          <h1 className="text">Make Your</h1>
          <h1 className="text">Professional Resume</h1>
          <h1 className="orange">
            Just in <span className="typewriter ">Secounds..</span>
          </h1>
        </div>
        <img alt="home" className="homeimage" src={homeimage}></img>
      </div>
      <div className="advantages">
        <h1 className="advantagesheader">Why Choose Us?</h1>

        <div className="cardsparent">
          <div className="card">
            <div className="icon"></div>
            <div className="text">
              <h1 className="cardheader">Generate bullet points</h1>
              <p>
                Your resume’s experience section is what employers care about
                most . Autogenerate experience bullet points that prove your
                on-the-job skills.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="icon"></div>
            <div className="text">
              <h1 className="cardheader">Auto-format each section</h1>
              <p>
                Formatting can be time-consuming. Don’t let margins & spacing
                slow you down – put in your details and the resume maker does
                the rest.
              </p>
            </div>
          </div>
          <div className="card">
            <div className="icon"></div>
            <div className="text">
              <h1 className="cardheader">Instantly download your resume</h1>
              <p>
                Easily download your resume as a PDF, for Word, or in text
                format. Use the dashboard to test different templates to see
                what works best for you.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="createresume">
        <div className="small-text">BUILD YOUR RESUME</div>
        <h1 createresumeheader>How to create a resume in 3 steps</h1>
      </div>
      <div className="gridparent">
        <div className="griditen">
          <img className="icon" src={one}></img>
          <h3 className="stepP">
            Choose whether you would like to create a resume or a cover letter.
          </h3>
        </div>
        <div className="griditen gridcontent">
          <img className="image" src={homescreen}></img>
        </div>
        <div className="griditen gridcontent">
          <img className="image" src={requiredform}></img>
        </div>
        <div className="griditen">
          <img className="icon" src={two}></img>
          <h3>Fill the required form</h3>
        </div>
        <div className="griditen">
          <img className="icon" src={three}></img>
          <h3>
            Click on the submit button. The choosen service will be available as
            a PDF fill for downloading.
          </h3>
        </div>
        <div className="griditen gridcontent">
          <img className="image" src={downloadnow}></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
