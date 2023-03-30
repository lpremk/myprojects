import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime, { getDateFromDateTime } from "../../util/DateTime";
import { ReadVisitByIdModal } from "./ReadVisitById";

export function ReadAllVisitsByMobileNumberView(){
    const [visitModal,setVisitModal]=useState({})
    const [showVisits, setShowVisits]=useState(false)

    useEffect(()=>{
        const currentDateTime = new Date();
        const milliSecondsInADay=1000*60*60*24;
        let fromDateTime=new Date(currentDateTime-10*milliSecondsInADay);
        setVisitModal({"fromDate":getDateFromDateTime(fromDateTime),
                        "toDate":getDateFromDateTime(currentDateTime)})
    },[])

    /*refreshShowVisits fuction is used to reload show visits (i.e. ReadAllVisitsByMobileNumber)
      component while clicking approve, exit or cancel buttons*/
    const refreshShowVisits=()=>{
        // console.log('refreshShow called')
        setShowVisits(false)
        setTimeout(() => {
            setShowVisits(true)
        }, 50);
    }
   

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setVisitModal(values => ({...values, [name]: value}))
        setShowVisits(false)
    }

    const handleSubmit=(event)=>{
        event.preventDefault();
        // alert('form submitted')
        console.log(visitModal)
        setShowVisits(true)

    }
    const handleReset=(event)=>{
        setVisitModal({})
    }
    
    return(<>
       <div className="d-flex justify-content-center" style={{"min-width":"700px"}}>
        <div>
            <br/>
            <form onSubmit={handleSubmit}>
            <label>From Date : 
            <input 
                type="date" 
                name="fromDate" 
                className="ms-1"
                value={visitModal.fromDate || ""} 
                onChange={handleChange}
                required
            />
            </label>
            <label>To Date : 
            <input 
                type="date" 
                name="toDate" 
                className="ms-1"
                value={visitModal.toDate || ""} 
                onChange={handleChange}
                required
            />
            </label>
            <br/> <br/> 
            <label>Mobile Number : 
            <input 
                type="number" 
                className="ms-1"
                style={{"width":"135px"}}
                name="anyMobileNumber" 
                value={visitModal.anyMobileNumber || ""} 
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
        <>
        <ReadAllVisitsByMobileNumber visitModal={visitModal} refreshShowVisits={refreshShowVisits}/>
        <br/>
        <ReadAllCanceledVisitsByMobileNumber visitModal={visitModal} refreshShowVisits={refreshShowVisits}/>
        <br/>
        </>
}   


    </>);
}

export default function ReadAllVisitsByMobileNumber(props){
    const [visits, setVisits]=useState([])
    const [visitModal,setVisitModal]=useState(props.visitModal)
    const [anyMobileNumber,setAnyMobileNumber]=useState(props.anyMobileNumber)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)

    const viewDetailsHandler=(id)=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=(id)=>{
        setShowViewDetails(false)
    }

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        console.log('ReadAllVisitsByMobileNumber '+JSON.stringify(visitModal))
        axios({
            method: 'post',
            url: '/visit/read-all-by-any-mobile-number',
            data: visitModal
          })
        .then(res=>{
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveVisitHandler=(id)=>{
        axios({
            method: 'post',
            url: '/visit/update-visit-approved-by-ga-to-true',
            data: {"id":id}
        })
        .then(res=>{
            if(res.data.updated==true){
                // console.log('updated true')
                loadInitialData(); 
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveExitVisitHandler=(id)=>{
        axios({
            method: 'post',
            url: '/visit/update-exit-approved-by-ga-to-true',
            data: {"id":id}
        })
        .then(res=>{
            if(res.data.updated==true){
                // console.log('updated true')
                loadInitialData(); 
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveCancelVisitHandler=(id)=>{
        axios({
            method: 'post',
            url: '/visit/update-canceled-by-ga-to-true',
            data: {"id":id}
        })
        .then(res=>{
            if(res.data.updated==true){
                // console.log('updated true')
                loadInitialData(); 
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }


    return(<>
        <div className="container d-flex justify-content-center">
            <div className='common-style'>
            <h3 className='text-center heading'>Visits</h3> 
            
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">View Details</th>
                    <th scope="col">Approve Visit</th>
                    <th scope="col">Approved By UOH SH</th>
                    <th scope="col">Exit Visit</th>
                    <th scope="col">Completed Visit</th>
                    <th scope="col">Cancel Visit</th>
                    <th scope="col">Expired</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visits.map(
                            visit=>
                                <tr className="">
                                    <th scope="row" >{visit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                                    <td><button className="btn btn-success submit" onClick={()=>{approveVisitHandler(visit.id);props.refreshShow();}}
                                    disabled={visit.visitApprovedByGa}>Approve</button></td>
                                    
                                    <td>{visit.visitApprovedByUohSh ? 'Approved':'Not Approved'}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{approveExitVisitHandler(visit.id);props.refreshShow();}}
                                    disabled={!(visit.visitApprovedByGa && !visit.exitApprovedByGa)}>Exit </button></td>

                                    <td>{(visit.visitApprovedByGa && visit.exitApprovedByGa) ?<p>Yes</p>:<p>No</p>}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{approveCancelVisitHandler(visit.id);props.refreshShow();}}
                                    disabled={visit.canceledByGa}>Cacel</button></td>

                                    <td className={(new Date(visit.endTime)>(new Date()))?'bg-success':'bg-danger'}
                                    style={{"borderRight":"2px solid white"}}>{(new Date(visit.endTime)<(new Date()))?<>Expired</>:<>Not Expired</>}</td>
                                </tr>
                            ) 
                    }
                </tbody>
                </table>
                
                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadVisitByIdModal closeModelHandler={closeModelHandler} visitId={visitId}/>
                }

            </div>
        </div>  
    </>);
}

export function ReadAllCanceledVisitsByMobileNumber(props){
    const [visits, setVisits]=useState([])
    const [visitModal,setVisitModal]=useState(props.visitModal)
    const [anyMobileNumber,setAnyMobileNumber]=useState(props.anyMobileNumber)
    const [showViewDetails, setShowViewDetails]=useState(false)
    const [visitId,setVisitId]=useState(0)

    const viewDetailsHandler=(id)=>{
        setShowViewDetails(true)
    }
    const closeModelHandler=(id)=>{
        setShowViewDetails(false)
    }

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        console.log('ReadAllVisitsByMobileNumber '+JSON.stringify(visitModal))
        axios({
            method: 'post',
            url: '/visit/read-all-canceled-by-any-mobile-number',
            data: visitModal
          })
        .then(res=>{
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return(<>
        <div className="container d-flex justify-content-center">
            <div className='common-style'>
            <h3 className='text-center heading'>Canceled Visits</h3> 
            
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">View Details</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visits.map(
                            visit=>
                                <tr className="">
                                    <th scope="row" >{visit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>

                                    <td><button className="btn btn-success submit" onClick={()=>{setVisitId(visit.id);viewDetailsHandler(visit.id)}}
                                    data-bs-toggle="modal" data-bs-target="#viewDetailsModal">View Details</button></td>

                                </tr>
                            ) 
                    }
                </tbody>
                </table>
                
                {/* <!-- Modal --> */}
                {   showViewDetails &&
                    <ReadVisitByIdModal closeModelHandler={closeModelHandler} visitId={visitId}/>
                }

            </div>
        </div>  
    </>);
}
// ------------------------------------------------
// visit  disabled(visit)  

// true    true           
// true    false          
// false   true           
// false   true            
// -----------------------------------------------
// visit exit disabled(exit)  completed    status

// true true    true            yes     -- completed
// true false   false           no      -- exit
// false true   true            no      -- not exist
// false false  true            no      --  visited
