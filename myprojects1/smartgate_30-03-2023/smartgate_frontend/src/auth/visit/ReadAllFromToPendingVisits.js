import axios from "../../AxiosInstance";
import { useEffect, useState } from "react";
import DateTime from "../../util/DateTime";

export default function ReadAllFromToPendingVisits(props){
    const [visits, setVisits]=useState([])
    const [dates,setDates]=useState(props.dates)

    useEffect(()=>{
        loadInitialData(); 
    },[]);

    const loadInitialData=()=>{
        axios({
            method: 'post',
            url: '/visit/read-all-from-to-pending-visits',
            data: dates
          })
        .then(res=>{
            setVisits(res.data)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const approveHandler=(id)=>{
        // console.log('approve handler '+id)
        // window.location.reload(false)
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


    return(<>
        <div className="container d-flex justify-content-center">
            <div className='common-style'>
            <h3 className='text-center heading'>From To Pending Visits</h3> 
            
                <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Visiting Id</th>
                    <th scope="col">Time(dd-mm-yyyy hh:mm:ss)</th>
                    <th scope="col">Visitor Name</th>
                    <th scope="col">Meeting Person Name</th>
                    <th scope="col">Approve Visit</th>
                    <th scope="col">Approved By UOH SH</th>
                    {/* <th scope="col">Scheduled Time <br/><p style={{"fontSize":"12px","marginBottom":"-8px"}}> dd-mm-yyyy hh:mm</p></th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        visits.map(
                            visit=>
                                <tr>
                                    <th scope="row" >{visit.id}</th>
                                    <td>{DateTime.getFormatDataTime(new Date(visit.createdTime))}</td>
                                    <td>{visit.visitorFirstName} {visit.visitorMiddleName} {visit.visitorLastName}</td>
                                    <td>{visit.meetingPersonName}</td>
                                    <td><button className="btn btn-success submit" onClick={()=>{approveHandler(visit.id);props.refreshShow();}}>Approve</button></td>
                                    <td>{visit.visitApprovedByUohSh ? 'Approved':'Not Approved'}</td>
                                </tr>
                            ) 
                    }
                </tbody>
                </table>
       
            </div>
        </div>  
    </>);
}