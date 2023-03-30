import { NavLink } from "react-router-dom";

export default function AuthNavbar(){
    return(<>
        <nav class="navbar navbar-expand-lg bg-light container">
            <div class="container-fluid">
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Public
                    </a>
                    <ul class="dropdown-menu">
                        <li><NavLink class="dropdown-item" to={"/"}>Home</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/un-auth/login/login"}>Login</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/un-auth/visit/create-visit"}>New Visit</NavLink></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        User
                    </a>
                    <ul class="dropdown-menu">
                        {/* <li><NavLink class="dropdown-item" to={"/auth/ambulance-service"}>AmbulanceService</NavLink></li> */}
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-all-visits-by-authenticated-user-view"}>My Visits</NavLink></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Gate Admin
                    </a>
                    <ul class="dropdown-menu">                 
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-all-visits-by-registration-id-view"} style={{"whiteSpace":"nowrap"}}>Find Visits By Registration Id</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-visit-by-visit-id-view"} style={{"whiteSpace":"nowrap"}}>Find Visit By Visit Id</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/read-all-visits-by-mobile-number-view"} style={{"whiteSpace":"nowrap"}}>Find Visits By Mobile Number</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/overall-today-visits"} style={{"whiteSpace":"nowrap"}}>Overall Today Visits</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/visit/overall-from-to-visits"} style={{"whiteSpace":"nowrap"}}>Overall From To Visits</NavLink></li>
                    </ul>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        App Admin
                    </a>
                    <ul class="dropdown-menu">
                        <li><NavLink class="dropdown-item" to={"/auth/user/read-user-by-username"} style={{"whiteSpace":"nowrap"}}>Find User</NavLink></li>
                        <li><NavLink class="dropdown-item" to={"/auth/user/create-user"} style={{"whiteSpace":"nowrap"}}>Register User</NavLink></li>
                    </ul>
                </li>

                   
                </ul>
                
                </div>
            </div>
            </nav>
    </>);
}