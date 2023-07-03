import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please Enter a valid email!").required("Required!"),
    password: yup.string().required("Required!")
});

export const registerSchema = yup.object().shape({
    firstName: yup.string().min(3, "Minimum length is 3!").required("Required!"),
    lastName: yup.string().min(3,"Minimum length is 3!").required("Required!"),
    phoneNumber: yup.string().required("Required!"),
    birthdate: yup.date().max(new Date(Date.now() - (16 * 31536000000)), "You must be at least 16 years old to register").required("Required!"),
    email: yup.string().email("Please Enter a valid email!").required("Required!"),
    password: yup.string().min(8, "Minimum length is 8!").matches(passwordRules, {message: "Please create a stronger password!"}).required("Required!"),
    passwordConfirm: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Required!")

});