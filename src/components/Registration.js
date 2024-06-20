import React, { useState } from "react";
import "../css/registration.css"
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

function Registration() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate()

  function validation(){
    let isProcessed = true;
    let errorMsg = "Please Enter the value in "
    if(id === null || id === ''){
      isProcessed = false;
      errorMsg += "user name "; 
    } 
    if(name === null || name === ''){
      isProcessed = false;
      errorMsg += "Full-name "; 
    } 
    if(email === null || email === ''){
      isProcessed = false;
      errorMsg += "Email "; 
    } 
    if(password === null || password === ''){
      isProcessed = false;
      errorMsg += "Password "; 
    } 
    if(!isProcessed){
      toast.warn(errorMsg);
    }else{
      if(/^[A-Za-z0-9]+@[a-zA-Z]+\.[A-Za-z]+$/.test(email)){}
      else{
        isProcessed = false;
        toast.warn("Please Enter the valid Email")
      }
    }
    return isProcessed;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const userDetails = {id, name, email, password, gender, country, address, phone};
    // console.log(userDetails);
    if(validation()){
      fetch("http://localhost:8000/users",{
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(userDetails)
      }).then(()=>{
      // validation();
        navigate("/login");
        toast.success("Registered Successfully")
      }).catch((err)=>{
        toast.error("Failure" + err.message)
      })
    }
    
  }

  return (
    <div className="Reg-container">
      <div className="offset-lg-3 col-lg-6">
        <form className="bg-white p-5 rounded-3 card" onSubmit={handleSubmit}>
          <div className="row">
            <div className="card-header">
              <h1>Registration</h1>
            </div>
            <div className="card-body row">
               <div className="col-lg-6">
                  <div className="form-group">
                    <label>User Name <span className="text-danger">*</span></label>
                    <input value={id} onChange={e=>setId(e.target.value)} type="text" className="form-control"/>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password <span className="text-danger">*</span></label>
                    <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-control"/>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-group">
                    <label>Full Name <span className="text-danger">*</span></label>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} className="form-control"/>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)}/>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone </label>
                    <input type="number" value={phone} onChange={e=>setPhone(e.target.value)} className="form-control" />
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-group">
                    <label>Country </label>
                    <input type="text" value={country} onChange={e=>setCountry(e.target.value)} className="form-control"/>
                  </div>
               </div>
               <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address </label>
                    <textarea className="form-control" value={address} onChange={e=>setAddress(e.target.value)}></textarea>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="form-group ">
                    <label>Gender</label>
                    <br/>
                    <div className="d-flex gap-5">
                    <div className="d-flex gap-2">
                    <input type='radio' value="Male" checked={gender === 'Male'} onChange={e=>setGender(e.target.value)} name ="gender" />
                    <label>Male</label>
                    </div>
                    <div className="d-flex gap-2">
                    <input type='radio' value="Female" name ="gender" checked={gender==="Female"} onChange={e=>setGender(e.target.value)} />
                    <label>Female</label>
                    </div>
                    </div>
                  </div>
               </div>
            </div>
            <div className="card-footer ">
              <button type="submit" className="btn btn-primary ">Register</button>
              <button type="reset" className="btn btn-danger m-3">Back</button>
              <Link to={'/login'}>Already have Account? Login here</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
