import { useEffect, useState } from "react";

const useFetchCover = (url, jwt) => {
    const [coverletters, setCover] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    console.log('Inside useFetchCover : ', url, jwt);
  
    // use useEffect hook to fetch data
    useEffect(() => {
      // define async fetch function
      const fetchData = async () => {
        try {
          console.log('Inside FetchData');
          const cov = await fetch(url, {
            method: 'GET',
            headers: { "Content-Type": "application/json",
             "Authorization": `Bearer ${jwt}` }
          });
          if(!cov.ok) {throw new Error("Couldn't fetch from that url");}
          const coverletter = await cov.json();
          console.log('From FetchData: ', coverletter);
          setCover(coverletter);
          setIsPending(false);
        } catch(err) {
          setIsPending(false);
          setError(err.message);
        }
      };
  
      // call fetch function
      setTimeout(fetchData, 1000);
    }, [url, jwt]); // pass url and jwt as dependencies
  
    return {coverletters, isPending, error};
}
  

export default useFetchCover;