import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { getInputDateTimeFromJSDateTime } from "../../util/DateTime";
import properties from '../../properties.json'

export default function CreateVisit_Old(){
    const [inputs, setInputs] = useState({});
    const navigate=useNavigate();


    useEffect(()=>{
        const currentDateTime = new Date();
        const milliSecondsInAnHour=1000*60*60*1;
        let toDateTime=new Date(currentDateTime.getTime()+3*milliSecondsInAnHour);
        setInputs({
                    "startTime":getInputDateTimeFromJSDateTime(new Date()),
                    "endTime":getInputDateTimeFromJSDateTime(toDateTime)
                })
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        // alert(document.getElementById("patientId").value)
        console.log(JSON.stringify(inputs));
        fetch(properties.backend_url+'/visit/create', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputs),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if(data.created===true){
                    navigate("/util/success", { state: data });
                }
                if(data.created===false){
                    navigate("/util/failure", { state: data });
                }
            })
            .catch((error) => {

                console.error('Error 221:', error);
        
            });
    }

    return (<div>
        <div className="container d-flex justify-content-center">
            <div className='common-style'>
                <h3 className='text-center heading'>Visit Form</h3>
                <p className="text-center" style={{"color":"#A52A2A"}}>Please fill this form to book an appointment</p>

                <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-start gx-5'>
                        <div className="mb-3 me-3">
                            <label for="visitorFirstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="visitorFirstName"
                            name='visitorFirstName'
                            value={inputs.visitorFirstName||""}
                            onChange={handleChange}/>
                        </div>
                        <div className="mb-3 me-3">
                            <label for="visitorMiddleName" className="form-label">Middle Name</label>
                            <input type="text" className="form-control" id="visitorMiddleName"
                            name='visitorMiddleName'
                            value={inputs.visitorMiddleName||""}
                            onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label for="visitorLastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="visitorLastName"
                            name='visitorLastName'
                            value={inputs.visitorLastName||""}
                            onChange={handleChange}/>
                        </div>
                    </div>
                  
                    <div className="mb-3 w-50">
                        <label for="visitorMobileNumber" className="form-label">Visitor Mobile Number</label>
                        <input type="number" className="form-control" id="visitorMobileNumber"
                        name='visitorMobileNumber'
                        value={inputs.visitorMobileNumber||""}
                        onChange={handleChange}/>
                    </div>
                    <div className="mb-3 w-50">
                        <label for="meetingPersonMobileNumber" className="form-label">Meeting Person Mobile Number</label>
                        <input type="number" className="form-control" id="meetingPersonMobileNumber"
                        name='meetingPersonMobileNumber'
                        value={inputs.meetingPersonMobileNumber||""}
                        onChange={handleChange}/>
                    </div>

                    <div className="mb-3 me-3">
                            <label for="location" className="form-label">Location</label>
                            <input type="text" className="form-control" id="location"
                            name='location'
                            value={inputs.location||""}
                            onChange={handleChange}/>
                    </div>

                    {/* <p>Meeting Person</p>
                    <select class="form-select w-50" aria-label="Default select example" 
                    name="school" 
                    value={inputs.school||""}
                    onChange={handleChange}>
                        <option selected>Select School</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select> <br/>
                    <select class="form-select w-50" aria-label="Default select example"
                     name="department" 
                     value={inputs.department||""}
                     onChange={handleChange}>
                        <option selected>Select Department</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select> <br/>
                    <select class="form-select w-50" aria-label="Default select example"
                     name="meetingPersonUsername" 
                     value={inputs.meetingPersonUsername||""}
                     onChange={handleChange}>
                        <option selected>Select Person</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select> <br/> */}

                    <div className="mb-3 me-3">
                            <label for="meetingPersonUsername2" className="form-label">Meeting Person Registration Number</label>
                            <input type="text" className="form-control" id="meetingPersonUsername2"
                            name='meetingPersonUsername2'
                            value={inputs.meetingPersonUsername2||""}
                            onChange={handleChange}/>
                    </div>

                    <div className="mb-3 me-3">
                            <label for="meetingPersonName" className="form-label">Meeting Person Name</label>
                            <input type="text" className="form-control" id="meetingPersonName"
                            name='meetingPersonName'
                            value={inputs.meetingPersonName||""}
                            onChange={handleChange}/>
                    </div>
               
                    <div class="mb-3">
                        <label for="purpose" class="form-label">Purpose of visit</label>
                        <textarea required class="form-control" id="purpose" rows="3" name='purpose'
                        value={inputs.purpose||""}
                        onChange={handleChange}></textarea>
                    </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload visitor photograph</label>
                        <input class="form-control" type="file" id="formFile" name="visitorPhotograph" 
                     value={inputs.visitorPhotograph||""}
                     onChange={handleChange}/>
                    </div>
                    <div className="mb-3 me-3">
                            <label for="vehicleNumber" className="form-label">Vehicle Number</label>
                            <input type="text" className="form-control" id="vehicleNumber"
                            name='vehicleNumber'
                            value={inputs.vehicleNumber||""}
                            onChange={handleChange}/>
                        </div>
                    <div class="mb-3">
                        <label for="formFile" class="form-label">Upload vehicle photograph</label>
                        <input class="form-control" type="file" id="formFile" name="vehiclePhotograph" 
                     value={inputs.vehiclePhotograph||""}
                     onChange={handleChange}/>
                    </div>

                    <div className="d-flex justify-content-center">
                        <div className="mb-3 me-3">
                            <label for="startTime" className="form-label">Sart Time</label>
                            <input type="datetime-local" className="form-control" id="startTime"
                            name='startTime'
                            value={inputs.startTime||""}
                            onChange={handleChange}
                            required/>
                        </div>
                        <div className="mb-3 me-3">
                            <label for="endTime" className="form-label">End Time</label>
                            <input type="datetime-local" className="form-control" id="endTime"
                            name='endTime'
                            value={inputs.endTime||""}
                            onChange={handleChange}
                            required/>
                        </div>
                    </div>
                    
                    

                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>);
}