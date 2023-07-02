
import { useFormik } from "formik";
import { loginSchema } from "./../../schemas/index";
import classes from './AuthForm.module.css';


const onSubmit = async (values, actions) => {
    // console.log("Submitted");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
}

const loginForm = () => {
    // const [isLogin, setIsLogin] = useState(true);

    // const switchAuthModeHandler = () => {
    //     setIsLogin((prevState) => !prevState);
    // };
    const {values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit
    });

    // console.log("errors",errors);

    return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input value={values.email} onChange={handleChange} onBlur={handleBlur} type='email' id='email' required className={errors.email && touched.email ? classes["input-error"] : ""} />
          {errors.email && touched.email && <p className={classes.error}>{errors.email}</p>}
        </div>

        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input value={values.password} onChange={handleChange} onBlur={handleBlur} type='password' id='password' required className={errors.password && touched.password ? classes["input-error"] : ""}/>
          {errors.password && touched.password && <p className={classes.error}>{errors.password}</p>}
        </div>
        <div className={classes.actions}>
          <button disabled={isSubmitting} type="submit">{isSubmitting ? 'Loading...' : 'Login'}</button>
          {/* <button
            type='button'
            className={classes.toggle}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button> */}
        </div>
      </form>
    </section>
    )
};

export default loginForm;