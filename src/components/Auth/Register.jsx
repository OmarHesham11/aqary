
import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/index';
import classes from './AuthForm.module.css';


const onSubmit = (values, actions) => {
    actions.resetForm();
};


const RegisterForm = () => {
    const [passwordIsVisible, setPasswordIsVisible] = useState(false);
    const [passwordConfirmIsVisible, setPasswordConfirmIsVisible] = useState(false);

    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const togglePasswordVisibility = (event) => {
      event.preventDefault();
      setPasswordIsVisible((prevState) => !prevState);
    };

    const togglePasswordConfirmVisibility = (event) => {
      event.preventDefault();
      setPasswordConfirmIsVisible((prevState) => !prevState);
    };


  const { values, errors, touched, isValid, handleChange, handleBlur} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',  
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  return (
    <section className={classes.auth}>
      <h1>Create an account</h1>
      {data && data.error && <p className={classes.error}>{data.error.message}</p>}
      <Form method='post'>

        <div className={classes.control}>
          <label htmlFor="firstName">First Name</label>
          <input value={values.firstName} onChange={handleChange} onBlur={handleBlur}  id="firstName" name="firstName" required className={errors.firstName && touched.firstName ? classes['input-error'] : ''} placeholder='Enter your first name'/>
          {errors.firstName && touched.firstName && <p className={classes.error}>{errors.firstName}</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor="lastName">Last Name</label>
          <input value={values.lastName} onChange={handleChange} onBlur={handleBlur}  id="lastName" name="lastName" required className={errors.lastName && touched.lastName ? classes['input-error'] : ''} placeholder='Enter your last name'/>
          {errors.lastName && touched.lastName && <p className={classes.error}>{errors.lastName}</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" id="email" name="email" required className={errors.email && touched.email ? classes['input-error'] : ''} placeholder='Enter your email'/>
          {errors.email && touched.email && <p className={classes.error}>{errors.email}</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>

          <div className={classes.password}>
            <input
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              type={passwordIsVisible ? 'text' : 'password'}
              id="password"
              name="password"
              required
              className={errors.password && touched.password ? classes['input-error'] : ''}
              placeholder='Enter your password'
            />
            <button className={classes.showIcon} onClick={togglePasswordVisibility}>
              {passwordIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </button>

          </div>

          {errors.password && touched.password && <p className={classes.error}>{errors.password}</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor="passwordConfirm">Confirm password</label>

          <div className={classes.password}>
            <input
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              type={passwordConfirmIsVisible ? 'text' : 'password'}
              id="passwordConfirm"
              name="passwordConfirm"
              required
              className={errors.passwordConfirm && touched.passwordConfirm ? classes['input-error'] : ''}
              placeholder='Enter your confirm password'
            />
            <button className={classes.showIcon} onClick={togglePasswordConfirmVisibility}>
              {passwordConfirmIsVisible ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
            </button>

          </div>

          {errors.passwordConfirm && touched.passwordConfirm && <p className={classes.error}>{errors.passwordConfirm}</p>}
        </div>

        <div className={classes.actions}>
          <button disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Loading...' : 'REGISTER'}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default RegisterForm;