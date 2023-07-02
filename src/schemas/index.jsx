import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const loginSchema = yup.object().shape({
    email: yup.string().email("Please Enter a valid email!").required("Required!"),
    password: yup.string().required("Required!")
})