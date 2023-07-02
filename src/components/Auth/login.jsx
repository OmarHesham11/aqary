
import { useFormik } from "formik";
import classes from './AuthForm.module.css';

const loginForm = () => {
    // const [isLogin, setIsLogin] = useState(true);

    // const switchAuthModeHandler = () => {
    //     setIsLogin((prevState) => !prevState);
    // };
    const {values, handleChange, handleBlur} = useFormik({
        initialValues: {
            email: "",
            password: ""
        }
    })
    return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input value={values.email} onChange={handleChange} onBlur={handleBlur} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input value={values.password} onChange={handleChange} onBlur={handleBlur} type='password' id='password' required />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
          <button
            type='button'
            className={classes.toggle}
          >
            {/* {isLogin ? 'Create new account' : 'Login with existing account'} */}
          </button>
        </div>
      </form>
    </section>
    )
};

export default loginForm;