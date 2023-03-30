import { useEffect, useState } from "react";
import axios from "../../AxiosInstance";
import uoh_logo from "../../assets/images/icons/University_of_Hyderabad_Logo.png"

function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

export default function ReadVisitById(props){
    const [visit,setVisit]=useState();

    useEffect(()=>{
        axios({
            method: 'post',
            url: '/visit/read/'+props.visitId,
          })
        .then(res=>{
            // console.log(res.data)
            // alert(JSON.stringify(res.data))
            setVisit(res.data)
            viewVisitorPhotograph(res.data.id)
            viewVehiclePhotograph(res.data.id)
        })
        .catch(err=>{
            console.log(err)
        })
    },[]);

    function viewVisitorPhotograph(visitId){
        axios({
            method: 'get',
            url: '/visitor-photograph/download/'+visitId,
            responseType: "blob"
            })
            .then(function (response) { 
                const imageUrl = URL.createObjectURL(response.data);
                document.getElementById("visitorPhotograph").src=imageUrl
                document.getElementById("visitorPhotograph").style.display="block"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function viewVehiclePhotograph(visitId){
        axios({
            method: 'get',
            url: '/vehicle-photograph/download/'+visitId,
            responseType: "blob"
            })
            .then(function (response) { 
                const imageUrl = URL.createObjectURL(response.data);
                document.getElementById("vehiclePhotograph").src=imageUrl
                document.getElementById("vehiclePhotograph").style.display="block"
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return(<>
      
        {
            (visit!=undefined) &&
            <>
                <p>Visit id : {visit.id} </p>
                <div className="d-flex justify-content-between">
                    <p>Visitor Name : {visit.visitorFirstName} {visit.visitorMiddleName} {visit.visitorLastName}</p>
                    <img id="visitorPhotograph" className="border" 
                    alt="Visitor Photograph" style={{"width":"150px","height":"150px","display":"none"}}/>
                </div>
                <p>Meeting Person Name : {visit.meetingPersonName}</p>
                <p>Visitor Mobile Number : {visit.visitorMobileNumber}</p>
                <p>Meeting Person Mobile Number : {visit.meetingPersonMobileNumber}</p>
                <p>Meeting Person Registration Number : {visit.meetingPersonUsername}</p>
                <p>Location : {visit.location}</p>
                <p>CreatedTime : {visit.createdTime}</p>
                <div className="d-flex justify-content-between">
                    <p>VehicleNumber : {visit.vehicleNumber}</p>
                    <img id="vehiclePhotograph" className="border" src="img_girl.jpg"
                     alt="Vehicle Plate Photograph" style={{"width":"150px","height":"150px","display":"none"}}/>
                </div>
                <p>Start Time : {visit.startTime} </p>
                <p>End Time : {visit.endTime}</p>
            </>
        }
        
    </>);
}

export function ReadVisitByIdModal(props){
    return(<>
    <div class="modal fade" id="viewDetailsModal" tabindex="-1" aria-labelledby="viewDetailsModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-5" id="viewDetailsModalLabel">Smart Gate</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>props.closeModelHandler()}></button>
                        </div>
                        <div class="modal-body">
                            <div id="printViewDetails">
                                <div className="d-flex justify-content-center">
                                    <img style={{"height":"115px","marginBottom":"13px"}} src={uoh_logo} />
                                </div>
                                <h5 className="text-center">UOH Visiting Gate Pass</h5>
                                <ReadVisitById visitId={props.visitId}/>
                            </div>
                        </div>
                        <div class="modal-footer">
                        {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                        <button type="button" class="btn btn-primary" onClick={() => printDiv('printViewDetails')}>Print</button>
                        </div>
                    </div>
                    </div>
                </div>
    </>);
}


export function ReadVisitByIdSearch(props){
    return(<>
        <h5>ReadVisitByIdSearch</h5>
        <ReadVisitById visitId={props.visitId}/>
    </>);
}