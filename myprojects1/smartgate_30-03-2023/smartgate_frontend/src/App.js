import './App.css';
import React, { createContext, useEffect, useState } from 'react'
import Routing from './Routing';
import AuthNavbar from './auth/main/AuthNavbar';
import UnAuthNavbar from './un-auth/main/UnAuthNavbar';
import Test5 from './temp/Test5';


export const JwtContext=createContext()

function App() {

  const[authenticated,setAuthenticated]=useState(false)
  const[jwt,setJwt]=useState()
  
  useEffect(()=>{
    let jwt;
    jwt=localStorage.getItem("jwt");

    if(jwt==null){
        setJwt(null)
        setAuthenticated(false)
    }
    else{
        setJwt(jwt)
        setAuthenticated(true)
    }
  },[])

  return (
    <>
      <JwtContext.Provider value={jwt}>
         <div className='home-page'> 
         {authenticated && <>
          <AuthNavbar/><br/>
         </>}
         {!authenticated && <>
          <UnAuthNavbar/><br/>
         </>}
          <Routing/> 
        </div> 
        </JwtContext.Provider>
        {/* <Test5/> */}
    </>
       
  );
}

export default App;
