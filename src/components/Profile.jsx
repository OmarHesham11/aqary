import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [disableBtn, setDisableBtn] = useState(true);

  const handleEdit = () => {
    setDisableBtn(false);
  };

  const [firstName, setFirstName] = useState(User.firstName);
const [lastName, setLastName] = useState(User.lastName);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };
  
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  


  return (
    <div className='main-class'>
    <div className="   px-4 mt-4" style={{marginTop: "100px"}}>
      {/* Account page navigation */}
      <nav className="nav nav-borders" style={{marginTop: "80px"}}>
      <Link to="/auth/profile" className="nav-link active ms-0">Profile</Link>
      <Link to="/auth/profileProperties" className="nav-link">Property</Link>
    </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        
            
        <div className="col-xl-8">
          {/* Account details card */}
          <div className="card mb-4">
            <div className="card-header">
            
  <div className="row">
    <div className="col-md-8">
      Account Details
    </div>
    <div className="col-md-4 text-md-end">
      <button className="btn btn-primary" onClick={()=>{setDisableBtn(false)}}>Edit</button>
    </div>
  </div>
            </div>
            <div className="card-body">
              <form>
              
                <div className="row gx-3 mb-3">
                  {/* Form Group (first name) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                    <input className="form-control" id="inputFirstName" type="text"  disabled={disableBtn} value={User.firstName} onChange={handleFirstNameChange}   />
                  </div>
                  {/* Form Group (last name) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                    <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" disabled={disableBtn} value={User.lastName} onChange={handleLastNameChange} />
                  </div>
                </div>
              
                {/* Form Group (email address) */}
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                  <input className="form-control" id="inputEmailAddress" type="email" disabled={true} defaultValue={User.email}  />

                </div>
                {/* Form Row */}
                <div className="row gx-3 mb-3">
                  {/* Form Group (phone number) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                    <input className="form-control" id="inputPhone" type="tel" disabled={true} defaultValue={User.phoneNumber} />
                  </div>
                  {/* Form Group (birthday) */}
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                    <input className="form-control" id="inputBirthday" type="text" name="birthday" disabled={disableBtn} defaultValue={User.birthdate} />
                  </div>
                </div>
                {/* Save changes button */}
                <button className="btn btn-primary" type="button">Save changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
