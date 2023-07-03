import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/index';
import classes from './AuthForm.module.css';


const onSubmit = (values, actions) => {
    actions.resetForm();
};

const LoginForm = () => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const togglePasswordVisibility = (event) => {
      event.preventDefault();
      setPasswordIsVisible((prevState) => !prevState);
    };

  const { values, errors, touched, isValid, handleChange, handleBlur} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <section className={classes.auth}>
      <h1>Welcome back!</h1>
      {data && data.error && <p className={classes.error}>{data.error.message}</p>}
      <Form method='post'>
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
        <div className={classes.actions}>
          <button disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Loading...' : 'LOGIN'}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default LoginForm;
