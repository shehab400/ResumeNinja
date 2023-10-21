import { useNavigate } from "react-router-dom";
import { useState } from "react";


function CoverLetterGallery(props) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const myArray = props.myArray;
  const jsxElements =
    myArray &&
    myArray.map((obj) => (
      <div className="resumeitem" onClick={(e) => {const {_id} = obj;navigate(`/coverletter/${_id}`, {state: {url : `${props.url}coverletter/${_id}`}});}}>
        <img className="resumeimg" alt="this is image " src={obj.personalImg} />
        <br />
        <h2 className="resumename">{obj.full_name}</h2>
        <br />
        <h2>{obj._id}</h2>
        <button class="deletebutton" onClick={async (e) => {
            console.log('Delete button click');
            setIsLoading(true);
            try {
              const {_id} = obj;
              let deletedCov = await fetch(`${props.url}coverletter/remove/${_id}`, { 
              method : 'DELETE',
              headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${props.jwt}`
              },


              });
              deletedCov = await deletedCov.json();
              if(deletedCov.error){
                setError(deletedCov.error);
              }else{
                navigate('/coverletters');
              }
            }catch(err) {
              setError(err);
            }
            setIsLoading(true);
          }}>
          <svg viewBox="0 0 448 512" class="svgIcon">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
          </svg>
        </button>
      </div>
    ));
  return <div>{jsxElements}</div>;
}
export default CoverLetterGallery;
