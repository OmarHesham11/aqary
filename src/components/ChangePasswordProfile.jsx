import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import classes from './ChangePassword.module.css'

const schema = Joi.object({
  passwordCurrent: Joi.string().min(8).max(30).required(),
  password: Joi.string().min(8).max(30).required(),
  passwordConfirm: Joi.ref('password')
});

const ChangePasswordProfile = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [passwordCurrent, setOldPassword] = useState('');
  const [password, setNewPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSaveChanges = () => {
    const updatedUser = {
      passwordCurrent,
      password,
      passwordConfirm,
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
    setDisableBtn(true);
    axios
      .patch('https://aqary-eg.onrender.com/auth/user/updatePassword', updatedUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        console.log(response.data.token);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Password updated successfully'
        });
        localStorage.removeItem('token');
        localStorage.setItem('token', response.data.token);
        setDisableBtn(false)
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating your password'
        });
        setDisableBtn(false)
      });
    };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setErrors({ ...errors, passwordCurrent: '' });
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setErrors({ ...errors, passwordConfirm: '' });
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
                      className={`form-control ${errors.passwordCurrent ? 'is-invalid' : ''}`}
                      id='inputOldPassword'
                      type='password'
                      disabled={disableBtn}
                      value={passwordCurrent}
                      onChange={handleOldPasswordChange}
                    />
                    {errors.passwordCurrent && (
                      <div className='invalid-feedback'>{errors.passwordCurrent}</div>
                    )}
                  </div>
                  {/* Form Group (new password) */}
                  <div className='mb-3'>
                    <label className='small mb-1' htmlFor='inputNewPassword'>
                      New Password
                    </label>
                    <input
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id='inputNewPassword'
                      type='password'
                      disabled={disableBtn}
                      value={password}
                      onChange={handleNewPasswordChange}
                    />
                    {errors.password && (
                      <div className='invalid-feedback'>{errors.password}</div>
                    )}
                  </div>
                  {/* Form Group (confirm new password) */}
                  <div className='mb-3'>
                    <label className='small mb-1' htmlFor='inputConfirmPassword'>
                      Confirm New Password
                    </label>
                    <input
                      className={`form-control ${errors.passwordConfirm ? 'is-invalid' : ''}`}
                      id='inputConfirmPassword'
                      type='password'
                      disabled={disableBtn}
                      value={passwordConfirm}
                      onChange={handleConfirmPasswordChange}
                    />
                    {errors.passwordConfirm && (
                      <div className='invalid-feedback'>{errors.passwordConfirm}</div>
                    )}
                  </div>
                  {/* Save changes button */}
                  {!disableBtn && (
                    <div className='d-flex justify-content-end'>
                      <button
                        type='button'
                        className='btn btn-primary'
                        disabled={disableBtn}
                        onClick={handleSaveChanges}
                      >
                        Save Change
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