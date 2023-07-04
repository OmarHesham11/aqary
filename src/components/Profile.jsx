import React, { useState } from 'react';

const Profile = () => {
  const User = JSON.parse(localStorage.getItem('user'));
  const [disableBtn, setDisableBtn] = useState(true);

  const handleEdit = () => {
    setDisableBtn(false);
  };

  return (
    <div className="main-class">
      <div className="container-xl px-4 mt-4">
        {/* Account page navigation */}
        <nav className="nav nav-borders">
          <a className="nav-link active ms-0" target="__blank">Profile</a>
        </nav>
        <hr className="mt-0 mb-4" />
        <div className="row">
          <div className="col-xl-8">
            {/* Account details card */}
            <div className="card mb-4">
              <div className="card-header">
                <span>Account Details</span>
                <button onClick={handleEdit}>Edit</button>
              </div>
              <div className="card-body">
                <form action={`https://aqary-eg.onrender.com/auth/updateUserInfo`}>
                  {/* Form Row */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (first name) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputFirstName">First name</label>
                      <input
                        className="form-control"
                        id="inputFirstName"
                        type="text"
                        disabled={disableBtn}
                        defaultValue={User.firstName}
                      />
                    </div>
                    {/* Form Group (last name) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputLastName">Last name</label>
                      <input
                        className="form-control"
                        id="inputLastName"
                        type="text"
                        disabled={disableBtn}
                        defaultValue={User.lastName}
                      />
                    </div>
                  </div>
                  {/* Form Group (email address) */}
                  <div className="mb-3">
                    <label className="small mb-1" htmlFor="inputEmailAddress">Email address</label>
                    <input
                      className="form-control"
                      id="inputEmailAddress"
                      type="email"
                      disabled={disableBtn}
                      defaultValue={User.email}
                    />
                  </div>
                  {/* Form Row */}
                  <div className="row gx-3 mb-3">
                    {/* Form Group (phone number) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputPhone">Phone number</label>
                      <input
                        className="form-control"
                        id="inputPhone"
                        type="tel"
                        placeholder="Enter your phone number"
                        defaultValue="555-123-4567"
                      />
                    </div>
                    {/* Form Group (birthday) */}
                    <div className="col-md-6">
                      <label className="small mb-1" htmlFor="inputBirthday">Birthday</label>
                      <input
                        className="form-control"
                        id="inputBirthday"
                        type="text"
                        name="birthday"
                        placeholder="Enter your birthday"
                        defaultValue="06/10/1988"
                      />
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
