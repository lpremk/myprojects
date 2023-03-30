import './CreateUser.css';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import axios from '../../AxiosInstance';

function CreateUser(props) {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    //current page value should be create or update
    const [currentPage,setCurrentPage]=useState("create")
    const [firstTimeLoad,setFirstTimeLoad]=useState(true)

    useEffect(()=>{

        // console.log('props user '+props.user)

        if(props.inputs==undefined){
            //do nothing
            // console.log('i am undefined')
            setCurrentPage("create")
        }
        if(props.inputs!=undefined && firstTimeLoad==true){
            setFirstTimeLoad(false)
            setInputs(props.inputs)
            // console.log('i am not undefined'+JSON.stringify(props.inputs))
            setCurrentPage("update")
            console.log('useeffect update condition called')
        }
    })

    const handleChange = (event) => {
        // console.log('handle change called')
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }
      
    function validatePassword_BeforeSubmit(inputtxt) 
        { 
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if(inputtxt.match(passw)) 
        { 
            document.getElementById("strongPasswordError").innerHTML=`<p style="color:green;">* Password is strong</p>`;
        }
        else
        {   
            document.getElementById("strongPasswordError").innerHTML=`<p style="color:red;">
            * Weak password. 
            <br/>Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter.
            </p>`;
            throw new Error();
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(currentPage=="create"){
            validatePassword_BeforeSubmit(inputs.password)
            let inputsStr=JSON.stringify(inputs);
            console.log(inputsStr)

            // axios({
            //     method: 'post',
            //     url: '/user/create',
            //     body:inputsStr,
            //   })
            // .then(res=>{
            //     console.log(res.data);
            //     if(res.data.created==="true"){
            //         navigate("/util/success", { state: res.data });
            //     }
            //     if(res.data.created==="false"){
            //         navigate("/util/failure", { state: res.data });
            //     }
            // })
            // .catch(err=>{
            //     console.log(err)
            // })


            axios.post('/user/create', inputsStr)
              .then(function (response) {
                console.log(response);
                    if(response.data.created==="true"){
                    navigate("/util/success", { state: response.data });
                }
                if(response.data.created==="false"){
                    navigate("/util/failure", { state: response.data });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        if(currentPage=="update"){
            console.log('update page submit called')
            let inputsStr=JSON.stringify(inputs);
            axios({
                method: 'post',
                url: '/user/update',
                data:inputsStr,
              })
              .then(function (response) {
                console.log(response.data);
                if(response.data.updated==true){
                    document.getElementById("createOrUpdateForm").innerHTML=
                    `<h6 class="text-success">User details updated successfully.</h6>`
                }
                if(response.data.updated==false){
                    document.getElementById("createOrUpdateForm").innerHTML=
                    `<h6 class="text-danger">User details doesn't exist.</h6>`
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        
    }
    return(
    <div>
        <div className="container d-flex justify-content-center">
            <div id="createOrUpdateForm" className='patient-registration common-style'>
                <h3 className='text-center heading'>User Registration Form</h3>
                <p>Please fill this form to register</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="username" className="form-label">Registration Number</label>
                        <input type="text" className="form-control" id="username"
                        name='username'
                        value={inputs.username||""}
                        onChange={handleChange}
                        required
                        />
                    </div>
                    <div className='d-flex justify-content-start gx-5'>
                        <div className="mb-3 me-3">
                            <label for="firstName" className="form-label">First Name </label>
                            <input type="text" className="form-control" id="firstName"
                            name='firstName'
                            value={inputs.firstName||""}
                            onChange={handleChange}/>
                        </div>
                        <div className="mb-3 me-3">
                            <label for="middleName" className="form-label">Middle Name</label>
                            <input type="text" className="form-control" id="middleName"
                            name='middleName'
                            value={inputs.middleName||""}
                            onChange={handleChange}/>
                        </div>
                        <div className="mb-3">
                            <label for="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName"
                            name='lastName'
                            value={inputs.lastName||""}
                            onChange={handleChange}/>
                        </div>
                    </div>
                  
                    {/* pending */}
                    <div className="mb-3">
                        <label for="emailId" className="form-label">Email</label>
                        <input type="text" className="form-control" id="emailId"
                        name='emailId'
                        value={inputs.emailId||""}
                        onChange={handleChange} required/>
                    </div>
                    <div className="mb-3 w-50">
                        <label for="mobileNumber" className="form-label">Mobile</label>
                        <input type="number" className="form-control" id="mobileNumber"
                        name='mobileNumber'
                        value={inputs.mobileNumber||""}
                        onChange={handleChange}/>
                    </div>
                    {
                        (currentPage=="create") &&
                        <div className="mb-3 w-50">
                            <label for="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password"
                            name='password'
                            value={inputs.password||""}
                            onChange={handleChange}
                            required
                            />
                        </div>
                    }
                    <div id="strongPasswordError"></div>

                      <div className="mb-3 w-50">
                        <label for="dateOfBirth" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dateOfBirth"
                        name='dateOfBirth'
                        value={inputs.dateOfBirth||""}
                        onChange={handleChange}/>
                    </div>

                      <div className="mb-3 w-50">
                        <label for="joiningDate" className="form-label">Joining Date</label>
                        <input type="date" className="form-control" id="joiningDate"
                        name='joiningDate'
                        value={inputs.joiningDate||""}
                        onChange={handleChange}/>
                    </div>

                      <div className="mb-3 w-50">
                        <label for="lastDate" className="form-label">Last Date</label>
                        <input type="date" className="form-control" id="lastDate"
                        name='lastDate'
                        value={inputs.lastDate||""}
                        onChange={handleChange}/>
                    </div>

                    <div className="mb-3 w-50">
                        <label for="expiryDate" className="form-label">Expiry Date</label>
                        <input type="date" className="form-control" id="expiryDate"
                        name='expiryDate'
                        value={inputs.expiryDate||""}
                        onChange={handleChange}/>
                    </div>

                    <label for="floatingSelect">Role</label>
                    <select class="form-select w-50" id="floatingSelect" aria-label="Floating label select example">
                        <option value="user" selected>User</option>
                        <option value="gate_admin">Gate Admin</option>
                    </select>
                    <br/><br/>
                    <div className='d-flex justify-content-center'>
                        <button type="submit" className="btn btn-primary submit">
                        {(currentPage=="create")?'Submit':'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default CreateUser;