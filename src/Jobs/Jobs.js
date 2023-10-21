function Jobs({ jobsNum , jobTitle, setjobsTitle, company, setCompany, employmentDate, setEmploymentDate, companyLoc, setCompanyLoc, companyDescription, setDescription, responsibilities , setResponsibilities}) {
    const func = (n) => {
        const arr = [];
        for(let i = 1; i <= n; i++){
            arr.push(
                <>
                    <h1>Postion #{i}:</h1>
                    <label for='jobtitle'>Job title: </label><br/>
                    <input required type='text' id='jobtitle' name='jobtitle'  onChange={(e) => {setjobsTitle((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label for='company'>Company name: </label><br/>
                    <input required type='text' id='company' name='company'  onChange={(e) => {setCompany((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label for='employmentDate'>Employment date: </label><br/>
                    <input required type='date' id='employmentDate' name='company'  onChange={(e) => {setEmploymentDate((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label>Responsibilities and acheivements : </label><br/>
                    <text>
                        <textarea value={responsibilities[i-1]} onChange={(e) => {setResponsibilities((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}></textarea>
                    </text><br/>
                    <label for='companyLoc'>Company's location: </label><br/>
                    <input required type='text' id='companyLoc' name='companyLoc' onChange={(e) => {setCompanyLoc((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/><br/>
                    <label>Company description (Optional) : </label><br/>
                    <text>
                        <textarea placeholder="a brief description of each company (industry, size, etc.)."  onChange={(e) => {setDescription((prevState) => {prevState[i-1] = e.target.value; return prevState;})}}/>
                    </text><br/>
                </>
            );
        }

        return arr;
    }
    return (
        func(jobsNum)
    );
}

export default Jobs;