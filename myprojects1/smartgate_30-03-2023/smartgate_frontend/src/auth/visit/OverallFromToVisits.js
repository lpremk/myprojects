import { useEffect, useState } from "react";
import { getDateFromDateTime } from "../../util/DateTime";
import ReadAllFromToPendingExits from "./ReadAllFromToPendingExits";
import ReadAllFromToPendingVisits from "./ReadAllFromToPendingVisits";
import ReadAllFromToSuccessfulExits from "./ReadAllFromToSuccessfulExits";

export default function OverallFromToVisits(){
    const [dates,setDates]=useState({})
    const [showVisits, setShowVisits]=useState(false)
    
    useEffect(()=>{
        const currentDateTime = new Date();
        const milliSecondsInADay=1000*60*60*24;
        let toDateTime=new Date(currentDateTime-10*milliSecondsInADay);
        setDates({"fromDate":getDateFromDateTime(toDateTime),
                        "toDate":getDateFromDateTime(currentDateTime)})
    },[])

    const [show, setShow]=useState(true)
    const refreshShow=()=>{
        // console.log('refreshShow called')
        setShow(false)
        setTimeout(() => {
            setShow(true)
        }, 50);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setDates(values => ({...values, [name]: value}))
        setShowVisits(false)
    }


    // const datetime = new Date();
    // let currentDate="";
    // const year=datetime.getFullYear();
    // let month=(datetime.getMonth()+1)+"";
    // if(month.length!=2){
    //     month="0"+month
    // }
    // let date=datetime.getDate()+"";
    // if(date.length!=2){
    //     date="0"+date
    // }
    // currentDate=year+'-'+month+'-'+date

    // useEffect(()=>{
    //     setFromDate(currentDate)
    //     setToDate(currentDate)
    // })

    const handleSubmit=(event)=>{
        event.preventDefault();
        // alert('form submitted')
        console.log(dates)
        setShowVisits(true)

    }
    const handleReset=(event)=>{
        setDates({})
    }

    return(<>
    
    <div className="d-flex justify-content-center" style={{"min-width":"700px"}}>
        <div>
            <br/>
            <form onSubmit={handleSubmit}>
            {/* <label for="fromDate">From Date : </label>
            <input name="fromDate" id="fromDate" type="date"  value={dateTimes.fromDate }   onChange={(e) => handleChange(e.target.value)} required/> &nbsp; &nbsp; &nbsp;
            <label for="toDate">To Date : </label>
            <input name="toDate" id="toDate" type="date"  value={dateTimes.toDate}  onChange={(e) => handleChange(e.target.value)} required/> */}
            <label>From Date : 
            <input 
                type="date" 
                name="fromDate" 
                value={dates.fromDate || ""} 
                onChange={handleChange}
                required
            />
            </label>
            <label>To Date : 
            <input 
                type="date" 
                name="toDate" 
                value={dates.toDate || ""} 
                onChange={handleChange}
                required
            />
            </label>
            
            <br/> <br/>
            <div className='d-flex justify-content-center'>
                        <button type="submit" style={{"borderRadius":"0px"}} className="btn btn-primary me-3 submit">Submit</button>
                        <button type="button" style={{"borderRadius":"0px"}} onClick={handleReset} className="btn btn-primary submit">Reset</button>
            </div>
            <br/>
            </form>
        {/* <div>
        {dateTimes.fromDate} {dateTimes.toDate}

        </div> */}
        </div>
    </div>
{
    showVisits && 
    <div className="d-flex justify-content-center">
    <div>

    <ul class="nav nav-tabs" style={{"min-width":"700px"}} id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
        <button class="nav-link active" id="visit-tab" data-bs-toggle="tab" data-bs-target="#visit-tab-pane" type="button" role="tab" aria-controls="visit-tab-pane" aria-selected="true">Pending Visits</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="exit-tab" data-bs-toggle="tab" data-bs-target="#exit-tab-pane" type="button" role="tab" aria-controls="exit-tab-pane" aria-selected="false">Pending Exits</button>
    </li>
    <li class="nav-item" role="presentation">
        <button class="nav-link" id="completed-tab" data-bs-toggle="tab" data-bs-target="#completed-tab-pane" type="button" role="tab" aria-controls="completed-tab-pane" aria-selected="false">Completed Visits</button>
    </li>
    </ul>
    <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="visit-tab-pane" role="tabpanel" aria-labelledby="visit-tab" tabindex="0">
    {
        show &&
        <ReadAllFromToPendingVisits dates={dates} refreshShow={refreshShow}/>
    }
    </div>
    <div class="tab-pane fade" id="exit-tab-pane" role="tabpanel" aria-labelledby="exit-tab" tabindex="0">
    {
        show &&
        <ReadAllFromToPendingExits dates={dates} refreshShow={refreshShow}/>
    }
    </div>
    <div class="tab-pane fade" id="completed-tab-pane" role="tabpanel" aria-labelledby="completed-tab" tabindex="0">
    {
        show &&
        <ReadAllFromToSuccessfulExits dates={dates} refreshShow={refreshShow}/>
    }
    </div>
    </div>

    </div>
</div>
    
}   



    </>);
}