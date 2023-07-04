import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const schema = Joi.object({
  oldPassword: Joi.string().min(6).max(30).required(),
  newPassword: Joi.string().min(6).max(30).required(),
  confirmPassword: Joi.ref('newPassword')
});

const ChangePasswordProfile = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSaveChanges = () => {
    const updatedUser = {
      oldPassword,
      newPassword,
      confirmPassword,
    };

    const validationResult = schema.validate(updatedUser, { abortEarly: false });

    if (validationResult.error) {
      const newErrors = {};
      validationResult.error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    axios
      .patch('https://aqary-eg.onrender.com/auth/------------------------------', updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password updated successfully'
        })
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating your password'
        });
      });
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setErrors({ ...errors, oldPassword: '' });
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setErrors({ ...errors, newPassword: '' });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors({ ...errors, confirmPassword: '' });
  };

  return (
    <div className='main-class'>
      <div className='px-4 mt-4' style={{ marginTop: '100px' }}>
      <nav className='nav nav-borders' style={{ marginTop: '80px' }}>
        <Link to='/auth/profile' className='nav-link active ms-0'>
          Profile
        </Link>
        <Link to='/auth/profileProperties' className='nav-link'>
          Property
        </Link>
        <Link to='/auth/change-password' className='nav-link'>
          change your password
        </Link>
      </nav>
      <hr className='mt-0 mb-4' />
        <div className='row justify-content-center'>
          <div className='col-xl-8'>
            {/* Account details card */}
            <div className='card mb-4'>
              <div className='card-body'>
                <form>
                  {/* Form Group (old password) */}
                  <div className='mb-3'>
                    <label className='small mb-1' htmlFor='inputOldPassword'>
                      Old Password
                    </label>
                    <input
                      className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
                      id='inputOldPassword'
                      type='password'
                      disabled={disableBtn}
                      value={oldPassword}
                      onChange={handleOldPasswordChange}
                    />
                    {errors.oldPassword && (
                      <div className='invalid-feedback'>{errors.oldPassword}</div>
                    )}
                  </div>
                  {/* Form Group (new password) */}
                  <div className='mb-3'>
                    <label className='small mb-1' htmlFor='inputNewPassword'>
                      New Password
                    </label>
                    <input
                      className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                      id='inputNewPassword'
                      type='password'
                      disabled={disableBtn}
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                    />
                    {errors.newPassword && (
                      <div className='invalid-feedback'>{errors.newPassword}</div>
                    )}
                  </div>
                  {/* Form Group (confirm new password) */}
                  <div className='mb-3'>
                    <label className='small mb-1' htmlFor='inputConfirmPassword'>
                      Confirm New Password
                    </label>
                    <input
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      id='inputConfirmPassword'
                      type='password'
                      disabled={disableBtn}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    {errors.confirmPassword && (
                      <div className='invalid-feedback'>{errors.confirmPassword}</div>
                    )}
                  </div>
                  {/* Save changes button */}
                  {!disableBtn && (
                    <div className='d-flex justify-content-end'>
                      <button
                        type='button'
                        className='btn btn-primary'
                        onClick={handleSaveChanges}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordProfile;