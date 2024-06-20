import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "../css/login.css"



function Login() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(validate()){
      fetch('http://localhost:8000/users/'+userName).then((res)=> {
        return res.json();
    }).then((res)=> {
        if(Object.keys(res).length === 0){
          toast.error("Please Enter valid values")
        }
        else{
          if(password === res.password){
            toast.success("Login success");
            navigate('/')
          }else{
            toast.error("please Enter the correct password");
          }
        }
    }).catch((err)=> {
      toast.error(err.message)
    })

    }
    
  }

  function validate(){
    let errMsg = "Please Enter the "
    let check = true;
    if(userName === '' || userName === null){
      check = false;
      errMsg += "user Name "
    }
    if(password === '' || password === null){
      check = false;
      errMsg += "password"
    }
    if(!check){
      toast.warn(errMsg);
    }

    return check;
  }
  return (
    <div className="wrapper">
      <div className='col-lg-6'>
        <form className='container card' onSubmit={handleSubmit}>
          <div className='row '>
            <div className='card-header'>
              <h1>Login</h1>
            </div>
            <div className='card-body'>
               <div className='form-group'>
                 <label>User Name <span className='text-danger'>*</span></label>
                 <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" className='form-control'/>
               </div>
               <div className='form-group'>
                 <label>Password<span className='text-danger'>*</span></label>
                 <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className='form-control'/>
               </div>
            </div>
            <div className='card-footer d-flex gap-3'>
              <button type="submit" className='btn btn-primary'>Login</button>                                                                                 <Link to={"/registration"}>New User? Register here</Link>                          
            </div>

          </div>

        </form>

      </div>
    </div>
  )
}

export default Login
