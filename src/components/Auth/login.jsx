import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/index';
import classes from './AuthForm.module.css';


const onSubmit = (values, actions) => {
    actions.resetForm();
};

const LoginForm = () => {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

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
      <h1>Login</h1>
      {data && data.error && <p className={classes.error}>{data.error.message}</p>}
      <Form method='post'>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input value={values.email} onChange={handleChange} onBlur={handleBlur} type="email" id="email" name="email" required className={errors.email && touched.email ? classes['input-error'] : ''} />
          {errors.email && touched.email && <p className={classes.error}>{errors.email}</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            type="password"
            id="password"
            name="password"
            required
            className={errors.password && touched.password ? classes['input-error'] : ''}
          />
          {errors.password && touched.password && <p className={classes.error}>{errors.password}</p>}
        </div>
        <div className={classes.actions}>
          <button disabled={isSubmitting || !isValid}>
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default LoginForm;
